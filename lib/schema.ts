import {schema} from 'normalizr';
import Entity = schema.Entity;

/**
 * Tags & Categories
 * @type {schema.Entity}
 */
export const tag: Entity = new schema.Entity('tags', {}, {idAttribute: 'tag_id'});
export const category: Entity = new schema.Entity('categories', {}, {idAttribute: 'category_id'});

/**
 * Post & Page
 * @type {schema.Entity}
 */
export const page: Entity = new schema.Entity('pages', {}, {idAttribute: 'page_id'});
export const post: Entity = new schema.Entity('posts', {
    tags: [tag],
    categories: [category]
}, {idAttribute: 'post_id'});


/**
 * deprecated
 * @type {schema.Entity}
 */
export const postContent: Entity = new schema.Entity('posts', {}, {idAttribute: 'post_id'});
export const pageContent: Entity = new schema.Entity('pages', {}, {idAttribute: 'page_id'});

