import {tag, category} from "./lib/schema";
declare const hexo: any;
import {addPrefix, merge} from './lib/helper';
import {
    generatePages,
    generatePosts,
    generateGenerally,
    generateConfigGenerally
} from './lib/generator';
import toJsonConfig = toJson.toJsonConfig;
import rawToJsonConfig = toJson.rawToJsonConfig;

const defaultConfig: toJsonConfig = {
    configs: {
        global: [
            'title', 'subtitle', 'description', 'author', 'url', 'per_page',
            'date_format', 'time_format'
        ],
        theme: []
    },
    posts: {
        selectors: [
            'title', 'date', 'updated', 'comments',
            'excerpt', 'source', 'full_source',
            'path', 'permalink', 'photos', 'link',
            {
                path: 'tags',
                childrenSelectors: ['name', 'slug', 'permalink']
            },
            {
                path: 'categories',
                childrenSelectors: ['name', 'slug', 'permalink']
            }
        ],
        extracts: ['content']
    },
    pages: {
        selectors: [
            'title', 'date', 'updated', 'comments',
            'excerpt', 'source', 'full_source',
            'path', 'permalink', 'photos', 'link'
        ],
        extracts: ['content']
    },
    tags: ['name'],
    categories: ['name', 'parent'],
    enablePagination: true
};
const config: toJsonConfig = !hexo.config.toJson ? defaultConfig : merge(hexo.config.toJson, defaultConfig);


hexo.extend.generator.register('toJson', site => {
    return addPrefix('api', [
        ...generatePages({
            rawPagesList: site.pages,
            selectors: config.pages.selectors,
            extracts: config.pages.extracts,
            enablePagination: config.enablePagination,
            pageSize: hexo.config.per_page
        }),
        ...generatePosts({
            rawPostsList: site.posts,
            selectors: config.posts.selectors,
            extracts: config.posts.extracts,
            enablePagination: config.enablePagination,
            pageSize: hexo.config.per_page
        }),
        ...generateGenerally(site.tags, config.tags, tag, 'tags'),
        ...generateGenerally(site.categories, config.categories, category, 'categories'),
        ...generateConfigGenerally(hexo.config, 'global', config.configs.global),
        ...generateConfigGenerally(hexo.theme.config, 'theme', config.configs.theme)
    ]);
});