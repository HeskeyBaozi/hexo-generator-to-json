'use strict';

import path from 'path';

const defaultConfig = {
    perPage: hexo.config.per_pate || 10,
    base: path.join(path.sep, 'to-json', path.sep),
    url: hexo.config.url
};

hexo.config.to_json_generator = Object.assign({}, defaultConfig, hexo.config.to_json_generator);

hexo.extend.generator.register('to-json', function (locals) {
    return [
        {path: 'foo', data: 'foo'},
        {path: 'bar', data: 'bar'}
    ];
});