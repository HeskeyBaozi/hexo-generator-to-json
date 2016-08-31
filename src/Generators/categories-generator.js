'use strict';

const path = require('path');
const Category = require('../Components/Categories.js');
const HexoRouter = require('../Components/HexoRouter.js');

module.exports = categories => categories.map(category => {
    let data = new Category(category);
    return new HexoRouter(path.join('test', 'categories', `${data.name}.json`), data);
});