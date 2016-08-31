'use strict';
const PostNav = require('./PostNav.js');

class PostSummary extends PostNav {
    constructor(post) {
        super(post);

        // main
        this.excerpt = post.excerpt;
        this.content = post.content;

        // nav
        this.prev = typeof post.prev === 'undefined' ? post.prev : new PostNav(post.prev);
        this.next = typeof post.next === 'undefined' ? post.next : new PostNav(post.next);
    }
}

module.exports = PostSummary;