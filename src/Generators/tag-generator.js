'use strict';

const path = require('path');
const Tag = require('../Components/Tag.js');
const HexoRouter = require('../Components/HexoRouter.js');

module.exports = tag => tag.map(tag => {
    let data = new Tag(tag);
    return new HexoRouter(path.join('test', 'tag', `${data.name}.json`), data);
});
