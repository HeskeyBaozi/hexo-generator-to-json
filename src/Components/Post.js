'use strict';
const path = require('path');
const Url = require('./Url.js');
const Category = require('./Categories.js');

class Post {
    constructor(post, toJsonConfig, isSummary) {
        // title
        console.log('-----------------------------');
        let t = Object.getOwnPropertyNames(post);
        console.log(post.source);
        this.title = post.title;
        this.subtitle = post.subtitle;

        // time
        const time = new Date(post.date);
        this.date = time.getTime();
        this.path = {
            year: time.getFullYear(),
            month: time.getMonth() + 1,
            day: time.getDate(),
            name: post.slug
        };

        // tags & categories
        this.tags = post.tags.data.map(tag => 1); //fixme
        this.categories = post.categories.data.map(category => new Category(category, toJsonConfig, false));

        // url
        this.url = path.join(Url(toJsonConfig.base).posts, post.path.replace(/\/$/, '.json'));
        this.permalink = post.permalink;

        // content
        this.content = isSummary ? post.excerpt : post.content;
        this.photos = post.photos;
    }
}

module.exports = Post;