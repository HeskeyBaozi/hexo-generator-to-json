'use strict';
const CategorySummary = require('./Summary/CategorySummary.js');
const PostNav = require('./Summary/PostNav.js');

class Category extends CategorySummary {
    constructor(category) {
        super(category);

        // posts
        this.posts = category.posts.data.map(post => new PostNav(post));
    }
}

module.exports = Category;