const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const config = require('../configs/webpack.dev.config.js');

app.use('/', express.static('public'));

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true },
  silent: true,
  noInfo: true,
  stats: 'errors-only',
  hot: true,
  historyApiFallback: true,
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
}));

app.listen(process.env.PORT || 3000, () => {
  console.log('Started at 3000')
});
