'use strict';

const pagination = require('hexo-pagination');
const configGen = require('./config-generator.js');
const postGen = require('./post-generator.js');


module.exports = function (locals) {

    let hexoConfig = this.config;
    let toJsonConfig = hexoConfig.to_json_generator;
    return postGen(toJsonConfig)(locals.posts).map(item=> {
        item.data = JSON.stringify(item.data);
        return item;
    });
};