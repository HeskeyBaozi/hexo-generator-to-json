'use strict';

const HexoRouter = require('../Components/HexoRouter.js');
const pagination = require('hexo-pagination');

const Type = require('../Type.js');


const convertor = Type => p => new HexoRouter(Type, p.data, p.path);


module.exports = (posts, hexoConfig) => {
    const paginationConfig = {
        perPage: hexoConfig.per_page,
        format: '/%d',
        layout: undefined
    };

    const paginator = (type, posts) => pagination(type, posts, paginationConfig);
    let archives = paginator('archives', posts).map(convertor(Type.archives));
    let pages = paginator('pages', posts).map(convertor(Type.pages));

    return archives.concat(pages);
};