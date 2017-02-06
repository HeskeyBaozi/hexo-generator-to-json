"use strict";
var SEP = '/';
function addPrefix(prefix, routes) {
    return routes.map(function (route) {
        return {
            path: "" + prefix + SEP + route.path,
            data: JSON.stringify(route.data || {})
        };
    });
}
exports.addPrefix = addPrefix;
function createSelectedArray(rawArray, selectors) {
    return rawArray.map(function (rawObject) {
        return createSelectedObject(rawObject, selectors);
    });
}
function createSelectedObject(raw, selectors) {
    var result = {};
    selectors.forEach(function (selector) {
        if (typeof selector === 'string') {
            result[selector] = raw[selector];
        }
        else {
            var rawValue = raw[selector.path];
            if (selector.childrenSelectors) {
                if (!hasIdRename(selector.childrenSelectors)) {
                    if (selector.path === 'tags')
                        selectors.push({ path: '_id', rename: 'tag_id' });
                    if (selector.path === 'categories')
                        selectors.push({ path: '_id', rename: 'category_id' });
                }
                var toAdd = Array.isArray(rawValue)
                    ? createSelectedArray(rawValue, selector.childrenSelectors)
                    : createSelectedObject(rawValue, selector.childrenSelectors);
                if (selector.rename) {
                    result[selector.rename] = toAdd;
                }
                else {
                    result[selector.path] = toAdd;
                }
            }
            else {
                result[selector.rename ? selector.rename : selector.path] = rawValue;
            }
        }
    });
    return result;
}
exports.createSelectedObject = createSelectedObject;
function createList(raw, selectors) {
    return Object.keys(raw).map(function (object_id) {
        var rawValue = raw[object_id];
        return createSelectedObject(rawValue, selectors);
    });
}
exports.createList = createList;
function hasIdRename(selectors) {
    return selectors.some(function (selector) {
        if (typeof selector === 'string')
            return false;
        else
            return selector.path === '_id' && !!selector.rename;
    });
}
exports.hasIdRename = hasIdRename;
function merge(rawConfig, defaultConfig) {
    var result = defaultConfig;
    Object.keys(rawConfig).forEach(function (key) {
        var rawValue = rawConfig[key];
        if (typeof rawValue === 'boolean') {
            if (!rawValue) {
                delete result[key];
            }
        }
        else {
            result[key] = rawConfig[key];
        }
    });
    return result;
}
exports.merge = merge;
