import {toJson} from "./index";
import raw = toJson.raw;
import selectors = toJson.selectors;
import plainObject = toJson.plainObject;
import route = toJson.route;


const SEP: string = '/';

export function addPrefix(prefix: string, routes: route[]): route[] {
    return routes.map((route: route) => {
        return {
            path: `${prefix}${SEP}${route.path}`,
            data: JSON.stringify(route.data || {})
        };
    });
}

function createSelectedArray(rawArray: raw[], selectors: selectors): plainObject[] {
    return rawArray.map(rawObject => {
        return createSelectedObject(rawObject, selectors);
    });
}

export function createSelectedObject(raw: raw, selectors: selectors): plainObject {
    const result: plainObject = {};
    selectors.forEach(selector => {
        if (typeof selector === 'string') {
            result[selector as string] = raw[selector];
        } else {
            const rawValue: raw|Array<raw> = raw[selector.path];
            if (selector.childrenSelectors) {
                const toAdd: plainObject|Array<plainObject> = Array.isArray(rawValue)
                    ? createSelectedArray(rawValue, selector.childrenSelectors)
                    : createSelectedObject(rawValue, selector.childrenSelectors);

                if (selector.rename) {
                    result[selector.rename] = toAdd;
                } else {
                    result[selector.path] = toAdd;
                }
            } else {
                result[selector.rename ? selector.rename : selector.path] = rawValue;
            }
        }
    });
    return result;
}

export function createList(raw: raw, selectors: selectors): plainObject[] {
    return Object.keys(raw).map((object_id: string) => {
        const rawValue: raw = raw[object_id];
        return createSelectedObject(rawValue, selectors);
    });
}