'use strict';

const postsGen = require('./posts-generator.js');
const categoriesGen = require('./categories-generator.js');
const tagsGen = require('./tag-generator.js');
const configGen = require('./config-generator.js');
const pagesGen = require('./pages-generator.js');

const stringify = array => array.map(item => {
    item.data = JSON.stringify(item.data);
    return item;
});


module.exports = function (locals) {
    const hexoConfig = this.config;
    const themeConfig = this.theme.config;

    return stringify([...configGen(hexoConfig, themeConfig),
        ...pagesGen(locals.posts, hexoConfig),
        ...postsGen(locals.posts),
        ...categoriesGen(locals.categories),
        ...tagsGen(locals.tags)]);
};