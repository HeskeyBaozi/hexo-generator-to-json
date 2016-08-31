'use strict';

const path = require('path');
const HexoRouter = require('../Components/HexoRouter.js');
const Config = require('../Components/Config.js');

module.exports = (hexoConfig, themeConfig) => {
    let data = new Config(hexoConfig, themeConfig);
    return [new HexoRouter(path.join('test', 'config', `${data.name}.json`), data)];
};