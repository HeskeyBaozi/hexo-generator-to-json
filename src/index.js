'use strict';

const path = require('path');
const toJson = require('./lib/to-json.js');

class to_json_generator {
    constructor(perPage, base, url) {
        this.perPage = perPage || 10;
        this.base = base;
        this.url = url;
    }
}

const defaultConfig = new to_json_generator(hexo.config.per_page,
    path.join(path.sep, 'to-json', path.sep), hexo.config.url);

console.log(defaultConfig);

hexo.config.to_json_generator = Object.assign({}, defaultConfig, hexo.config.to_json_generator);

hexo.extend.generator.register('to-json', toJson);
console.log('end============');
