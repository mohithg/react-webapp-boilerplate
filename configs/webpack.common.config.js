const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const getPath = file => path.resolve(process.cwd(), file);

const config = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader"
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          // 'url-loader?limit=10000',
          "img-loader"
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader"
          },
          {
            loader: "resolve-url-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: function() {
                return [require("precss"), require("autoprefixer")];
              }
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.(woff|ttf|eot|svg|woff2)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
        use: [
          {
            loader: "file-loader",
            query: {
              useRelativePath: process.env.NODE_ENV === "production"
            }
          },
          {
            loader: "url-loader",
            query: {
              limit: 10000
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            query: {
              progressive: true,
              gifsicle: {
                interlaced: true
              },
              optipng: {
                optimizationLevel: 4
              },
              pngquant: {
                quality: "65-90",
                speed: 4
              }
            }
          }
        ]
      },
      {
        test: /\.json$/,
        use: "json-loader"
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: function(module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf("node_modules") !== -1;
      }
    }),
    //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest" //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
    }),
    new webpack.NamedModulesPlugin(),
    new WebpackChunkHash(),
    new ChunkManifestPlugin({
      filename: "chunk-manifest.json",
      manifestVariable: "webpackManifest"
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./app/index.ejs"
    }),
    new InlineManifestWebpackPlugin({
      name: "webpackManifest"
    }),
    new ProgressBarPlugin(),
    // Require plugin so we need not import react like dependencies in all files
    new webpack.ProvidePlugin({
      React: "react",
      PropTypes: "prop-types",
      _: "lodash",
      $: "jquery",
      jQuery: "jquery",
      moment: "moment"
    }),
    new webpack.DefinePlugin({
      "process.env": {
        API_HOST: JSON.stringify(process.env.API_HOST),
        CLIENT_SECRET: JSON.stringify(process.env.CLIENT_SECRET)
      }
    })
  ],
  stats: {
    maxModules: 0
  }
};

module.exports = config;
