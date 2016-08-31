'use strict';
const path = require('path');
const HexoRouter = require('../Components/HexoRouter.js');
const Post = require('../Components/Post.js');

module.exports = posts => posts.map(post => {
    let data = new Post(post);
    return new HexoRouter(path.join('test', data.path.replace(/\/$/, '.json')), data);
});