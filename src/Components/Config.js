'use strict';

class HexoConfig {
    constructor(hexoConfig, themeConfig) {
        // meta
        this.title = hexoConfig.title;
        this.subtitle = hexoConfig.subtitle;
        this.description = hexoConfig.description;
        this.author = hexoConfig.author;
        this.url = hexoConfig.url;

        // theme
        this.theme = themeConfig;
    }
}

HexoConfig.prototype.name = 'config';

module.exports = HexoConfig;