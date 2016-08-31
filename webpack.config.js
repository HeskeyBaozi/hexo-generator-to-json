'use strict';
var webpack = require('webpack');
var path = require('path');
var myPackage = require('./package');
var banner = `${myPackage.name} ${myPackage.version} - ${myPackage.description}\nCopyright (c) ${ new Date().getFullYear() } ${myPackage.author} - ${myPackage.homepage}\nLicense: ${myPackage.license}`;


module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015']
            }
        }]
    },
    plugins: [
        new webpack.BannerPlugin(banner)
    ]
};