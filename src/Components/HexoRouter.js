'use strict';
const path = require('path');
const Type = require('../Type.js');
const PageArchives = require('./Summary/PagesArchives.js');
const Page = require('./Page.js');
const toJson = path.join(path.sep, 'to-json', path.sep);

class HexoRouter {
    constructor(type, data, arg) {
        this.data = data;
        switch (type) {
            case Type.categories:
                this.path = path.join(toJson, 'categories', `${data.name}.json`);
                break;
            case Type.posts:
                this.path = path.join(toJson, 'posts', data.path.replace(/\/$/, '.json'));
                break;
            case Type.tags:
                this.path = path.join(toJson, 'tag', `${data.name}.json`);
                break;
            case Type.config:
                this.path = path.join(toJson, 'config', `${data.name}.json`);
                break;
            case Type.archives:
                this.path = /\/$/.test(arg) ? path.join(toJson, `${arg}1.json`) : path.join(toJson, `${arg}.json`);
                this.data = new PageArchives(data);
                break;
            case Type.pages:
                this.path = /\/$/.test(arg) ? path.join(toJson, `${arg}1.json`) : path.join(toJson, `${arg}.json`);
                this.data = new Page(data);
                break;
            default:
                this.path = path.join(toJson, 'others', `${data.name}.json`);
        }
    }
}

module.exports = HexoRouter;