'use strict';

const path = require('path');
const HexoRouter = require('../Components/HexoRouter.js');
const Url = require('../Components/Url.js');

module.exports = toJsonConfig => hexoConfig => [new HexoRouter(Url(toJsonConfig.base).config, hexoConfig)];