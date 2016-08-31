'use strict';

const HexoRouter = require('../Components/HexoRouter.js');
const Config = require('../Components/Config.js');
const Type = require('../Type.js');

module.exports = (hexoConfig, themeConfig) => {
    let data = new Config(hexoConfig, themeConfig);
    return [new HexoRouter(Type.config, data)];
};