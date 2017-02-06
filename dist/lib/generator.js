"use strict";
var normalizr_1 = require("normalizr");
var helper_1 = require("./helper");
var schema_1 = require("./schema");
function generatePosts(rawPostsList, selectors, extracts) {
    var posts = rawPostsList
        .filter(function (rawPost) { return rawPost.published; })
        .sort(function (left, right) { return left.date.unix() - right.date.unix(); })
        .map(function (rawPost) { return helper_1.createSelectedObject(rawPost, selectors); });
    var postsNormalized = normalizr_1.normalize(posts, [schema_1.post]);
    var basicResult = Object.keys(postsNormalized.entities.posts).map(function (post_id) {
        return {
            path: "posts/" + post_id + "/index.json",
            data: postsNormalized.entities.posts[post_id]
        };
    });
    function generateRoutes(rawPostsList, propName) {
        var selected = rawPostsList
            .filter(function (rawPost) { return rawPost.published; })
            .sort(function (left, right) { return left.date.unix() - right.date.unix(); })
            .map(function (rawPost) { return helper_1.createSelectedObject(rawPost, [propName, { path: '_id', rename: 'post_id' }]); });
        var normalized = normalizr_1.normalize(selected, [new normalizr_1.schema.Entity('posts', {}, { idAttribute: 'post_id' })]);
        return Object.keys(normalized.entities.posts).map(function (post_id) {
            return {
                path: "posts/" + post_id + "/" + propName + ".json",
                data: normalized.entities.posts[post_id]
            };
        });
    }
    var extractsList = extracts.map(function (propName) { return generateRoutes(rawPostsList, propName); });
    var flatten = extractsList.reduce(function (leftList, rightList) { return leftList.concat(rightList.slice()); });
    return basicResult.concat(flatten);
}
exports.generatePosts = generatePosts;
function generatePages(rawPagesList, selectors, extracts) {
    var pages = rawPagesList
        .sort(function (left, right) { return left.date.unix() - right.date.unix(); })
        .map(function (rawPage) { return helper_1.createSelectedObject(rawPage, selectors); });
    var pagesNormalized = normalizr_1.normalize(pages, [schema_1.page]);
    var basicResult = Object.keys(pagesNormalized.entities.pages).map(function (page_id) {
        return {
            path: "pages/" + page_id + "/index.json",
            data: pagesNormalized.entities.pages[page_id]
        };
    });
    function generateRoutes(rawPagesList, propName) {
        var selected = rawPagesList
            .sort(function (left, right) { return left.date.unix() - right.date.unix(); })
            .map(function (rawPage) { return helper_1.createSelectedObject(rawPage, [propName, { path: '_id', rename: 'page_id' }]); });
        var normalized = normalizr_1.normalize(selected, [new normalizr_1.schema.Entity('pages', {}, { idAttribute: 'page_id' })]);
        return Object.keys(normalized.entities.pages).map(function (page_id) {
            return {
                path: "pages/" + page_id + "/" + propName + ".json",
                data: normalized.entities.pages[page_id]
            };
        });
    }
    var extractsList = extracts.map(function (propName) { return generateRoutes(rawPagesList, propName); });
    var flatten = extractsList.reduce(function (leftList, rightList) { return leftList.concat(rightList.slice()); });
    return basicResult.concat(flatten);
}
exports.generatePages = generatePages;
function generateGenerally(raw, selectors, schemaType, prefix) {
    var selected = helper_1.createList(raw, selectors);
    var normalized = normalizr_1.normalize(selected, [schemaType]);
    return [
        {
            path: prefix + "/index.json",
            data: normalized.result
        },
        {
            path: prefix + "/entities.json",
            data: normalized.entities
        }
    ];
}
exports.generateGenerally = generateGenerally;
