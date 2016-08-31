'use strict';

const Category = require('../Components/Categories.js');
const HexoRouter = require('../Components/HexoRouter.js');
const Type = require('../Type.js');

module.exports = categories => categories.map(category => {
    let data = new Category(category);
    return new HexoRouter(Type.categories, data);
});