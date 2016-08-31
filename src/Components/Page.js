'use strict';
const Post = require('./Post.js');
const PostArchives = require('./Summary/PagesArchives.js');

class Page extends PostArchives {
    constructor(page) {
        super(page);

        // posts
        this.posts = page.posts.data.map(post => new Post(post));
    }
}

module.exports = Page;