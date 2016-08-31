'use strict';

class CategorySummary {
    constructor(category) {
        // header
        this.name = category.name;
        this.slug = category.slug;

        // path
        this.path = category.path;

        // link
        this.permalink = category.permalink;

        // length
        this.length = category.length;
    }
}

module.exports = CategorySummary;