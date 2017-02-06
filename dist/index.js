"use strict";
var schema_1 = require("./lib/schema");
var helper_1 = require("./lib/helper");
var generator_1 = require("./lib/generator");
hexo.extend.generator.register('toJson', function (site) {
    return helper_1.addPrefix('api', generator_1.generatePages(site.pages, [
        'title', 'date', 'updated', 'comments',
        'excerpt', 'more', 'source', 'full_source',
        'path', 'permalink', 'photos', 'link',
        { path: '_id', rename: 'page_id' }
    ], ['content']).concat(generator_1.generatePosts(site.posts, [
        'title', 'date', 'updated', 'comments',
        'excerpt', 'more', 'source', 'full_source',
        'path', 'permalink', 'photos', 'link',
        {
            path: 'tags',
            childrenSelectors: ['name', 'slug', 'permalink', { path: '_id', rename: 'tag_id' }]
        },
        {
            path: 'categories',
            childrenSelectors: ['name', 'slug', 'permalink', { path: '_id', rename: 'category_id' }]
        },
        { path: '_id', rename: 'post_id' }
    ], ['content']), generator_1.generateGenerally(site.tags.data, ['name', { path: '_id', rename: 'tag_id' }], schema_1.tag, 'tags'), generator_1.generateGenerally(site.categories.data, ['name', 'parent', {
            path: '_id',
            rename: 'category_id'
        }], schema_1.category, 'categories'), generator_1.generateConfig(hexo)));
});
