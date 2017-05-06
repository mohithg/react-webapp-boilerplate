const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
const WebpackChunkHash = require("webpack-chunk-hash");
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

const config = {
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
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        },
          {
            loader: "css-loader",
          }, {
            loader: "sass-loader"
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('precss'),
                  require('autoprefixer')
                ];
              }
            }
          }],
      }
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
    }),
    new webpack.NamedModulesPlugin(),
    new WebpackChunkHash(),
    new ChunkManifestPlugin({
      filename: "chunk-manifest.json",
      manifestVariable: "webpackManifest"
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: './app/index.ejs'
    }),
    new InlineManifestWebpackPlugin({
      name: 'webpackManifest'
    }),
    new webpack.HotModuleReplacementPlugin() // For HMR
  ],
  target: 'web' // For HMR
};

module.exports = config;
