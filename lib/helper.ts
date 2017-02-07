import raw = toJson.raw;
import selectors = toJson.selectors;
import plainObject = toJson.plainObject;
import route = toJson.route;
import rawToJsonConfig = toJson.rawToJsonConfig;
import toJsonConfig = toJson.toJsonConfig;


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
            const rawValue: raw = raw[selector.path];
            if (selector.childrenSelectors) {
                if (!hasIdRename(selector.childrenSelectors)) {
                    if (selector.path === 'tags')
                        selector.childrenSelectors.push({path: '_id', rename: 'tag_id'});
                    if (selector.path === 'categories')
                        selector.childrenSelectors.push({path: '_id', rename: 'category_id'});
                }
                const toAdd: plainObject|Array<plainObject> = Array.isArray(rawValue.data)
                    ? createSelectedArray(rawValue.data, selector.childrenSelectors)
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

export function hasIdRename(selectors: selectors): boolean {
    return selectors.some(selector => {
        if (typeof selector === 'string')
            return false;
        else
            return selector.path === '_id' && !!selector.rename;
    });
}

const emptyConfig: toJsonConfig = {
    configs: {
        global: [],
        theme: []
    },
    posts: {
        selectors: [],
        extracts: []
    },
    pages: {
        selectors: [],
        extracts: []
    },
    tags: [],
    categories: []
};

export function merge(rawConfig: rawToJsonConfig, defaultConfig: toJsonConfig): toJsonConfig {
    const result: toJsonConfig = defaultConfig;
    Object.keys(rawConfig).forEach(key => {
        const rawValue: boolean|plainObject = rawConfig[key];
        if (typeof rawValue === 'boolean') {
            if (!rawValue) {
                result[key] = emptyConfig[key];
            }
        } else {
            result[key] = rawConfig[key];
        }
    });
    return result;
}