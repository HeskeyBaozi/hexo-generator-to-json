"use strict";
var normalizr_1 = require("normalizr");
/**
 * Tags & Categories
 * @type {schema.Entity}
 */
exports.tag = new normalizr_1.schema.Entity('tags', {
    posts: [new normalizr_1.schema.Entity('posts', {}, { idAttribute: 'post_id' })]
}, { idAttribute: 'tag_id' });
exports.category = new normalizr_1.schema.Entity('categories', {
    posts: [new normalizr_1.schema.Entity('posts', {}, { idAttribute: 'post_id' })]
}, { idAttribute: 'category_id' });
/**
 * Post & Page
 * @type {schema.Entity}
 */
exports.page = new normalizr_1.schema.Entity('pages', {}, { idAttribute: 'page_id' });
exports.post = new normalizr_1.schema.Entity('posts', {
    tags: [exports.tag],
    categories: [exports.category]
}, { idAttribute: 'post_id' });
