'use strict';
const path = require('path');
const Url = require('./Url.js');
const Post = require('./Post.js');

class Category {
    constructor(category, toJsonConfig, showPosts) {
        this.name = category.name;
        this.permalink = category.permalink;
        this.url = path.join(Url(toJsonConfig.base).categories, `${category.name}.json`);
        this.postNumber = category.posts.data.length;
        if (showPosts)
            this.posts = category.posts.data.map(post => new Post(post, toJsonConfig, true));
    }
}

module.exports = Category;