'use strict';

const Tag = require('../Components/Tag.js');
const HexoRouter = require('../Components/HexoRouter.js');
const Type = require('../Type.js');

module.exports = tag => tag.map(tag => {
    let data = new Tag(tag);
    return new HexoRouter(Type.tags, data);
});
