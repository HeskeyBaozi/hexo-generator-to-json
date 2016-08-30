'use strict';
const path = require('path');
const HexoRouter = require('../Components/HexoRouter.js');
const Post = require('../Components/Post.js');

module.exports = toJsonConfig => posts => posts.map(post => {
    let data = new Post(post, toJsonConfig);
    return new HexoRouter(data.url, data);
});