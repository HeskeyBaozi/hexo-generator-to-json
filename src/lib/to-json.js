'use strict';

const pagination = require('hexo-pagination');
const configGen = require('./config.js');



module.exports = function (locals) {
    let hexoConfig = this.config;
    let toJsonConfig = this.config.to_json_generator;
    return configGen(toJsonConfig)(hexoConfig);
};