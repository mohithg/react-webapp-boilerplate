const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.config');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css"
});

const config = Merge(CommonConfig, {
  entry: {
    app: './app/app.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash].js',
  },
  plugins: [
    extractSass,
    // From here production starts
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      comments: false
    })
  ]
});

module.exports = config;
