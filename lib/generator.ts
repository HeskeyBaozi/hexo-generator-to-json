import {normalize, schema} from 'normalizr';
import {toJson} from './index';
import rawPost = toJson.rawPost;
import route = toJson.route;
import selectors = toJson.selectors;
import plainObject = toJson.plainObject;
import {createSelectedObject, createList} from "./helper";
import {post, page} from "./schema";
import rawPage = toJson.rawPage;
import raw = toJson.raw;
import Entity = schema.Entity;

export function generatePosts(rawPostsList: rawPost[], selectors: selectors, extracts: string[]): route[] {
    const posts: plainObject[] =
        rawPostsList
            .filter(rawPost => rawPost.published)
            .sort((left, right) => left.date.unix() - right.date.unix())
            .map(rawPost => createSelectedObject(rawPost, selectors));

    const postsNormalized = normalize(posts, [post]);

    const basicResult = Object.keys(postsNormalized.entities.posts as plainObject).map(post_id => {
        return {
            path: `posts/${post_id}/index.json`,
            data: postsNormalized.entities.posts[post_id]
        };
    });

    function generateRoutes(rawPostsList: rawPost[], propName: string): route[] {
        const selected =
            rawPostsList
                .filter(rawPost => rawPost.published)
                .sort((left, right) => left.date.unix() - right.date.unix())
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
    return [...basicResult, ...flatten];
}

export function generatePages(rawPagesList: rawPage[], selectors: selectors, extracts: string[]): route[] {
    const pages: plainObject[] =
        rawPagesList
            .sort((left, right) => left.date.unix() - right.date.unix())
            .map(rawPage => createSelectedObject(rawPage, selectors));

    const pagesNormalized = normalize(pages, [page]);

    const basicResult = Object.keys(pagesNormalized.entities.pages as plainObject).map(page_id => {
        return {
            path: `pages/${page_id}/index.json`,
            data: pagesNormalized.entities.pages[page_id]
        };
    });

    function generateRoutes(rawPagesList: rawPage[], propName: string): route[] {
        const selected =
            rawPagesList
                .sort((left, right) => left.date.unix() - right.date.unix())
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
    return [...basicResult, ...flatten];
}

export function generateGenerally(raw: raw, selectors: selectors, schemaType: Entity, prefix: string): route[] {
    const selected: plainObject[] = createList(raw, selectors);
    const normalized = normalize(selected, [schemaType]);

    return [
        {
            path: `${prefix}/index.json`,
            data: normalized.result
        },
        {
            path: `${prefix}/entities.json`,
            data: normalized.entities
        }
    ];
}