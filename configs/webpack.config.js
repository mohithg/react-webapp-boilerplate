const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: {
    app: './app/app.js',
    // vendors: './src/vendors.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader' }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './app/index.html'
    })
  ]
};

module.exports = config;
