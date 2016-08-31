'use strict';

const HexoRouter = require('../Components/HexoRouter.js');
const Post = require('../Components/Post.js');
const Type = require('../Type.js');

module.exports = posts => posts.map(post => {
    let data = new Post(post);
    return new HexoRouter(Type.posts, data);
});