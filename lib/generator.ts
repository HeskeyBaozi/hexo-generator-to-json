import {normalize, schema} from 'normalizr';
import rawPost = toJson.rawPost;
import route = toJson.route;
import selectors = toJson.selectors;
import plainObject = toJson.plainObject;
import {createSelectedObject, hasIdRename} from "./helper";
import {post, page} from "./schema";
import rawPage = toJson.rawPage;
import raw = toJson.raw;
import Entity = schema.Entity;
declare const require: any;
const chunk = require('lodash.chunk');

interface generatorOption {
    selectors: selectors;
    extracts: string[];
    enablePagination: boolean;
    pageSize: number;
}

interface generatorPostsOption extends generatorOption {
    rawPostsList: any;
}

interface generatorPagesOption extends generatorOption {
    rawPagesList: any;
}

export function generatePosts({
    rawPostsList,
    selectors,
    extracts,
    enablePagination,
    pageSize
}:generatorPostsOption): route[] {
    if (!hasIdRename(selectors)) {
        selectors.push({path: '_id', rename: 'post_id'});
    }
    const posts: plainObject[] =
        rawPostsList
            .filter(rawPost => rawPost.published)
            .sort('-date')
            .map(rawPost => createSelectedObject(rawPost, selectors));

    const postsNormalized = normalize(posts, [post]);

    const basicResult = Object.keys(postsNormalized.entities.posts as plainObject).map(post_id => {
        return {
            path: `posts/${post_id}/index.json`,
            data: postsNormalized.entities.posts[post_id]
        };
    });

    function generateRoutes(rawPostsList: any, propName: string): route[] {
        const selected =
            rawPostsList
                .filter(rawPost => rawPost.published)
                .sort('-date')
                .map(rawPost => createSelectedObject(rawPost, [propName, {path: '_id', rename: 'post_id'}]));

        const normalized = normalize(selected, [new schema.Entity('posts', {}, {idAttribute: 'post_id'})]);

        return Object.keys(normalized.entities.posts).map(post_id => {
            return {
                path: `posts/${post_id}/${propName}.json`,
                data: normalized.entities.posts[post_id]
            };
        })
    }

    const extractsList: (Array<route>)[] = extracts.map(propName => generateRoutes(rawPostsList, propName));

    const flatten = extractsList.reduce((leftList, rightList) => leftList.concat([...rightList]));
    return [
        {
            path: 'posts/index.json',
            data: enablePagination ? chunk(postsNormalized.result, pageSize) : postsNormalized.result
        },
        {
            path: 'posts/entities.json',
            data: postsNormalized.entities.posts
        },
        ...basicResult, ...flatten
    ];
}

export function generatePages({
    rawPagesList,
    selectors,
    extracts,
    enablePagination,
    pageSize
}:generatorPagesOption): route[] {
    if (!hasIdRename(selectors)) {
        selectors.push({path: '_id', rename: 'page_id'});
    }

    const pages: plainObject[] =
        rawPagesList
            .sort('-date')
            .map(rawPage => createSelectedObject(rawPage, selectors));

    const pagesNormalized = normalize(pages, [page]);

    const basicResult = Object.keys(pagesNormalized.entities.pages as plainObject).map(page_id => {
        return {
            path: `pages/${page_id}/index.json`,
            data: pagesNormalized.entities.pages[page_id]
        };
    });

    function generateRoutes(rawPagesList: any, propName: string): route[] {
        const selected =
            rawPagesList
                .sort('-date')
                .map(rawPage => createSelectedObject(rawPage, [propName, {path: '_id', rename: 'page_id'}]));

        const normalized = normalize(selected, [new schema.Entity('pages', {}, {idAttribute: 'page_id'})]);

        return Object.keys(normalized.entities.pages).map(page_id => {
            return {
                path: `pages/${page_id}/${propName}.json`,
                data: normalized.entities.pages[page_id]
            };
        })
    }

    const extractsList: (Array<route>)[] = extracts.map(propName => generateRoutes(rawPagesList, propName));

    const flatten = extractsList.reduce((leftList, rightList) => leftList.concat([...rightList]));
    return [
        {
            path: 'pages/index.json',
            data: enablePagination ? chunk(pagesNormalized.result, pageSize) : pagesNormalized.result
        },
        {
            path: 'pages/entities.json',
            data: pagesNormalized.entities.pages
        },
        ...basicResult, ...flatten
    ];
}

export function generateGenerally(tagsOrCategories: raw[], selectors: selectors, schemaType: Entity, prefix: string): route[] {

    if (!hasIdRename(selectors)) {
        if (prefix === 'tags')
            selectors.push({path: '_id', rename: 'tag_id'});
        if (prefix === 'categories')
            selectors.push({path: '_id', rename: 'category_id'});
        selectors.push({
            path: 'posts',
            childrenSelectors: [{path: '_id', rename: 'post_id'}]
        });
    }
    const selected: plainObject[] = tagsOrCategories.map(tagOrCategory => createSelectedObject(tagOrCategory, selectors));
    const normalized = normalize(selected, [schemaType]);

    return [
        {
            path: `${prefix}/index.json`,
            data: normalized.result
        },
        {
            path: `${prefix}/entities.json`,
            data: normalized.entities[prefix]
        }
    ];
}


export function generateConfigGenerally(rawConfig, name: string, selectors: selectors): route[] {
    return [
        {
            path: `config/${name}.json`,
            data: createSelectedObject(rawConfig, selectors)
        }
    ]
}