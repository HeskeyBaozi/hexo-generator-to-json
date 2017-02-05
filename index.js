const normalizr = require('normalizr');
const normalize = normalizr.normalize;
const schema = normalizr.schema;

const tag = new schema.Entity('tags', {}, {idAttribute: 'tag_id'});
const category = new schema.Entity('categories', {}, {idAttribute: 'category_id'});
const postContent = new schema.Entity('posts', {}, {idAttribute: 'post_id'});
const pageContent = new schema.Entity('posts', {}, {idAttribute: 'page_id'});
const post = new schema.Entity('posts', {
    tags: [tag],
    categories: [category]
}, {idAttribute: 'post_id'});

const page = new schema.Entity('pages', {}, {idAttribute: 'page_id'});


function prefixFactory(prefix) {
    const SEP = '/';

    function getModified(object) {
        return {
            path: prefix + SEP + object.path,
            data: JSON.stringify(object.data || {})
        };
    }

    return function (routeObject) {
        if (Array.isArray(routeObject)) {
            return routeObject.map(object => getModified(object));
        } else {
            return getModified(routeObject);
        }
    }
}
const withAPI = prefixFactory('api');

function createSelectedArray(rawArray, selectors) {
    return rawArray.map(rawObject => {
        return createSelectedObject(rawObject, selectors);
    });
}

function createSelectedObject(rawObject, selectors) {
    const result = {};
    selectors.forEach(selector => {
        if (typeof selector === 'string') {
            result[selector] = rawObject[selector];
        } else if (typeof selector === 'object' && !Array.isArray(selector)) {
            const rawValue = rawObject[selector.path];
            if (selector.select) {
                const toAdd = Array.isArray(rawValue.data) ? createSelectedArray(rawValue, selector.select) : createSelectedObject(rawValue, selector.select);
                if (selector.rename) {
                    result[selector.rename] = toAdd;
                } else {
                    result[selector.path] = toAdd;
                }
            } else if (selector.rename) {
                result[selector.rename] = rawValue;
            } else {
                result[selector.path] = rawValue;
            }
        }
    });
    return result;
}

function createListFromObject(rawObject, selectPropsArray, renamedProps) {
    return Object.keys(rawObject).map(object_id => {
        const ctxObject = rawObject[object_id];
        const result = {};
        selectPropsArray.forEach(key => {
            result[key] = ctxObject[key];
        });

        Object.keys(renamedProps).forEach(key => {
            result[key] = ctxObject[renamedProps[key]];
        });
        return result;
    });
}

function createPostsRoutes(rawList) {
    const posts = rawList.sort('-date').map(post => {
        return createSelectedObject(post, [
            'title',
            'date',
            'updated',
            'comments',
            'excerpt',
            'more',
            'source',
            'full_source',
            'path',
            'permalink',
            'photos',
            'link',
            'published',
            {
                path: 'tags',
                select: ['name', 'slug', 'permalink', {
                    path: '_id',
                    rename: 'tag_id'
                }]

            },
            {
                path: 'categories',
                select: ['name', 'slug', 'permalink', {
                    path: '_id',
                    rename: 'category_id'
                }]
            },
            {
                path: '_id',
                rename: 'post_id'
            }
        ]);
    });

    const postsContent = rawList.sort('-date').map(post => {
        return createSelectedObject(post, ['content', {path: '_id', rename: 'post_id'}]);
    });

    const postsNormalized = normalize(posts, [post]);
    const postsContentNormalized = normalize(postsContent, [postContent]);

    const contentRoutes = Object.keys(postsContentNormalized.entities.posts).map(post_id => {
        return {
            path: `posts/entities/content/${post_id}.json`,
            data: postsContentNormalized.entities.posts[post_id]
        };
    });

    return [
        {
            path: 'posts/index.json',
            data: postsNormalized.result
        },
        {
            path: 'posts/entities/basic.json',
            data: postsNormalized.entities
        }
    ].concat(contentRoutes);
}

function createPagesRoutes(rawList) {
    const pages = rawList.map(page => {
        return createSelectedObject(page, [
            'title',
            'date',
            'updated',
            'comments',
            'excerpt',
            'more',
            'source',
            'full_source',
            'path',
            'permalink',
            'photos',
            'link',
            {
                path: '_id',
                rename: 'page_id'
            }
        ]);
    });

    const pagesContent = rawList.map(post => {
        return createSelectedObject(post, ['content', {path: '_id', rename: 'page_id'}]);
    });

    const pagesNormalized = normalize(pages, [page]);
    const pagesContentNormalized = normalize(pagesContent, [pageContent]);

    const contentRoutes = Object.keys(pagesContentNormalized.entities.posts).map(page_id => {
        return {
            path: `pages/entities/content/${page_id}.json`,
            data: pagesContentNormalized.entities.posts[page_id]
        };
    });

    return [
        {
            path: 'pages/index.json',
            data: pagesNormalized.result
        },
        {
            path: 'pages/entities/basic.json',
            data: pagesNormalized.entities
        }
    ].concat(contentRoutes);
}


hexo.extend.generator.register('toJson', site => {
    const categories = createListFromObject(site.categories.data, ['name', 'parent'], {category_id: '_id'});

    const tags = createListFromObject(site.tags.data, ['name'], {tag_id: '_id'});

    return withAPI([
        {
            path: 'meta/global.json',
            data: hexo.config
        },
        {
            path: 'meta/theme.json',
            data: hexo.theme.config
        },
        {
            path: 'categories/list.json',
            data: normalize(categories, [category])
        },
        {
            path: 'tags/list.json',
            data: normalize(tags, [tag])
        }
    ].concat(createPostsRoutes(site.posts)).concat(createPagesRoutes(site.pages)));
});