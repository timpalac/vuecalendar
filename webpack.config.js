const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './App.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
  	alias: {
  		'vue$': 'vue/dist/vue.esm.js'
  	}
  },
  mode: 'development',
  performance : {
    hints : false
  },
  module: {
    rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          include: path.resolve('./components/')
        },
        {
            test: /\.js$/,
            exclude: [/node_modules/],
            use: [
                'babel-loader'
            ]
        },
        {
          test: /\.styl$/, 
          loader: 'style-loader!css-loader!stylus-loader'
        },
        {
            test: /\.((png)|(gif)|(svg))$/,
            use: [{loader: 'file-loader',
                options: {name: '[path][name].[ext]'}}]
        }
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([
        { from: './event-detail.html' },
        { from: './event-browse.html' },
        { from: './event-search.html' },
        { from: './css', to: 'css/' },
        { from: './js', to: 'js/' },
        { from: './json', to: 'json/' },
        { from: './images', to: 'images/' }
    ])
  ]
};