import {tag, category} from "./lib/schema";
declare const hexo: any;
import {toJson} from "./lib/index";
import {addPrefix} from './lib/helper';
import {generatePages, generatePosts, generateGenerally} from './lib/generator';


hexo.extend.generator.register('toJson', site => {
    return addPrefix('api', [
        ...generatePages(site.pages, [
            'title', 'date', 'updated', 'comments',
            'excerpt', 'more', 'source', 'full_source',
            'path', 'permalink', 'photos', 'link',
            {path: '_id', rename: 'page_id'}
        ], ['content']),
        ...generatePosts(site.posts, [
            'title', 'date', 'updated', 'comments',
            'excerpt', 'more', 'source', 'full_source',
            'path', 'permalink', 'photos', 'link',
            {
                path: 'tags',
                childrenSelectors: ['name', 'slug', 'permalink', {path: '_id', rename: 'tag_id'}]
            },
            {
                path: 'categories',
                childrenSelectors: ['name', 'slug', 'permalink', {path: '_id', rename: 'category_id'}]
            },
            {path: '_id', rename: 'post_id'}
        ], ['content']),
        ...generateGenerally(site.tags, ['name', {path: '_id', rename: 'tag_id'}], tag, 'tags'),
        ...generateGenerally(site.categories, ['name', 'parent', {
            path: '_id',
            rename: 'category_id'
        }], category, 'categories')
    ]);
});