'use strict';

const path = require('path');
const toJson = require('./Generators/index-generator.js');
const hexoConfig = hexo.config;

class ToJsonGenerator {
    constructor(perPage, base, url) {
        this.perPage = perPage || hexoConfig.per_page || 10;
        this.base = base;
        this.url = url;
    }
}

const defaultToJsonConfig = new ToJsonGenerator(
    hexoConfig.per_page,
    path.join(path.sep, 'to-json', path.sep),
    hexoConfig.url
);

hexoConfig.to_json_generator = Object.assign(
    {},
    defaultToJsonConfig,
    hexoConfig.to_json_generator
);

hexo.extend.generator.register('to-json', toJson);
