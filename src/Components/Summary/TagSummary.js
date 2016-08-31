'use strict';

class TagSummary {
    constructor(tag) {
        // header
        this.name = tag.name;
        this.slug = tag.slug;

        // path
        this.path = tag.path;

        // link
        this.permalink = tag.permalink;

        // length
        this.length = tag.length;
    }
}

module.exports = TagSummary;