'use strict';
const path = require('path');

const text = {
    categories: 'categories',
    tags: 'tags',
    posts: 'posts',
    lists: 'lists',
    archives: 'archives',
    config: 'config.json'
};

/**
 * base path map into others.
 */
class Url {
    constructor(base) {
        this.categories = path.join(base, text.categories);
        this.tags = path.join(base, text.tags);
        this.posts = path.join(base, text.posts);
        this.lists = path.join(base, text.lists);
        this.archives = path.join(base, text.archives);
        this.config = path.join(base, text.config);
    }
}

let singleUrl = undefined;

module.exports = (base) => {
    if (typeof singleUrl === 'undefined') {
        singleUrl = new Url(base);
    }
    return singleUrl;
};