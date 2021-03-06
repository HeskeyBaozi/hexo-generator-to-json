declare namespace toJson {
    export interface route {
        path: string,
        data?: any,
        layout?: string|string[]
    }

    export interface raw {
        data?: any;
        [propName: string]: any;
    }

    export interface plainObject {
        [propName: string]: any;
    }

    export type selectors = (string|selector)[];

    export interface selector {
        path: string;
        rename?: string;
        childrenSelectors?: selectors
    }

    export interface rawPage {
        _id: string;
        title: string;
        date: any;
        updated: any;
        comments: boolean;
        layout: string;
        content: string;
        excerpt: string;
        more: string;
        source: string;
        full_source: string;
        path: string;
        permalink: string;
        prev: rawPage;
        next: rawPage;
        raw: string;
        photos: string[];
        link: string;
    }

    export interface rawPost extends rawPage {
        published: boolean;
        categories: raw;
        tags: raw
    }

    export interface rawToJsonConfig {
        configs: boolean|{
            global: selectors,
            theme: selectors
        };
        posts: boolean|{
            selectors: selectors,
            extracts: string[]
        };
        pages: boolean|{
            selectors: selectors,
            extracts: string[]
        };
        tags: boolean|string[];
        categories: boolean|string[];
        enablePagination: boolean;
    }

    export interface toJsonConfig {
        configs: {
            global: selectors,
            theme: selectors
        };
        posts: {
            selectors: selectors,
            extracts: string[]
        };
        pages: {
            selectors: selectors,
            extracts: string[]
        };
        tags: string[];
        categories: string[];
        enablePagination: boolean;
    }
}