# hexo-generator-to-json

Yeah.. This plugin has updated to 1.x

it based on the lib `normalizr`, which is nearly-perfectly solve the problem of the multi-nested object when creating SPA and using some state manege lib such as `Redux`, `Vuex` and so on.



## Install

```bash
$ cd [your hexo blog folder]
$ npm install --save hexo-generator-to-json # or yarn add hexo-generator-to-json
```

## Usage
the `Hexo` will quickly scan the `package.json`, and automatically run the generator that starts with `hexo-`, when you run `hexo generate`.

the `.json`s will generated in the folder `:root/public/api`

## Interface

```js
const interface = {
    public: {
        api: {
            config: [
                'global.json', // _config.yml in hexo based dir
                'theme.json' // _config.yml in theme based dir
            ],
            posts: [
                'index.json',
                {
                    exampleHashedKey1ForPost: [
                        'index.json', // basic information
                        'content.json' // other extracts fields
                    ],
                    exampleHashedKey2ForPost: [
                        'index.json', // basic information
                        'content.json' // other extracts fields
                    ],
                    // and so on...
                }
            ],
            pages: [
                'index.json',
                {
                    exampleHashedKey1ForPage: [
                        'index.json', // basic information
                        'content.json' // other extracts fields
                        // and so on...
                    ],
                    exampleHashedKey2ForPage: [
                        'index.json', // basic information
                        'content.json' // other extracts fields
                        // and so on...
                    ],
                    // and so on...
                }
            ],
            tags: [
                'entities.json',
                'index.json'
            ],
            categories: [
                'entities.json',
                'index.json'
            ]
        }
    }
};
```