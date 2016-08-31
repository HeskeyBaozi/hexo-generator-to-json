'use strict';
const PostSummary = require('./Summary/PostSummary.js');
const CategorySummary = require('./Summary/CategorySummary.js');
const TagSummary = require('./Summary/TagSummary.js');

class Post extends PostSummary {
    constructor(post) {
        super(post);
        // categories
        this.categories = post.categories.data.map(category => new CategorySummary(category));

        // tags
        this.tags = post.tags.data.map(tag => new TagSummary(tag));
    }
}

module.exports = Post;