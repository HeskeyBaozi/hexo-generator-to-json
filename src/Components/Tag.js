'use strict';
const Url = require('./Url.js');
const path = require('path');
const Post = require('./Post.js');

class Tag {
    constructor(tag, toJsonConfig, hasPosts) {
        this.name = tag.name;
        this.permalink = tag.permalink;
        this.url = path.join(Url(toJsonConfig.base).tags, `${tag.name}.json`);
        this.postNumber = tag.posts.data.length;
        if (hasPosts)
            this.posts = tag.posts.data.map(post => new Post(post, toJsonConfig, true));
    }
}

module.exports = Tag;