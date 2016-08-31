'use strict';
const PostNav = require('./PostNav.js');

class PageArchives {
    constructor(page) {
        // base
        this.base = page.base;

        // nav
        this.current = page.current;
        this.prev = page.prev;
        this.next = page.next;

        // link
        this.current_url = page.current_url;
        this.prev_link = page.prev_link;
        this.next_link = page.next_link;

        // posts
        this.posts = page.posts.data.map(post => new PostNav(post));

        // number
        this.total = page.total;
    }
}

module.exports = PageArchives;