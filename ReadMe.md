# hexo-generator-to-json

generate the json data from `hexo` variable, including

- archives
- categories
- config
- pages
- posts
- tag

## Install

```bash
$ cd [your hexo blog folder]
$ npm install --save hexo-generator-to-json
```

## Usage
the `Hexo` will quickly scan the `package.json`, and automatically run the generator that starts with `hexo-`, when you run `hexo generate`.

the json data will be generated in the path: `[hexo root]/public/to-json/`.

## Options

 Emmm...