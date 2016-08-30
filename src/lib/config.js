'use strict';

const path = require('path');
const HexoRouter = require('./Component/HexoRouter.js');
const Url = require('./maker/Url.js');

module.exports = config => hexoConfig => [new HexoRouter(Url(config.base).config, JSON.stringify(hexoConfig))];