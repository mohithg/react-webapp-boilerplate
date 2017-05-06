const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.config');
const path = require('path');
const webpack = require('webpack');

const config = Merge(CommonConfig, {
  entry: [
    'eventsource-polyfill', // Necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './app/app.js'
  ],
  output: {
    path: path.join(__dirname, '..', 'dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin() // For HMR
  ],
  target: 'web' // For HMR
});

module.exports = config;
