'use strict';
const TagSummary = require('./Summary/TagSummary.js');
const PostNav = require('./Summary/PostNav.js');

class Tag extends TagSummary {
    constructor(tag) {
        super(tag);

        // posts
        this.posts = tag.posts.data.map(post => new PostNav(post));
    }
}

module.exports = Tag;