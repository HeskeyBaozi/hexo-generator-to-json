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

## Example

Coming soon...