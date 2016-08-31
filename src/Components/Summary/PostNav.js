'use strict';

class PostNav {
    constructor(post) {

        // header
        this.title = post.title;
        this.slug = post.slug;

        let time = new Date(post.updated);
        this.updated = time.getTime();

        // link
        this.link = post.link;
        this.permalink = post.permalink;

        // path
        this.path = post.path;

        // others
        this.photos = post.photos;
        this.comments = post.comments;
        this.source = post.source;
        this.published = post.published;
        this.row = post.row;
    }
}

module.exports = PostNav;