'use strict';

const pagination = require('hexo-pagination');
const postGenerator = require('./post-generator.js');
const cateGenerator = require('./categories-generator.js');
const tagGenerator = require('./tag-generator.js');


module.exports = function (locals) {

    return postGenerator(locals.posts).map(item=> {
        item.data = JSON.stringify(item.data);
        return item;
    }).concat(cateGenerator(locals.categories).map(item=> {
        item.data = JSON.stringify(item.data);
        return item;
    })).concat(tagGenerator(locals.tags).map(item=> {
        item.data = JSON.stringify(item.data);
        return item;
    }));
};