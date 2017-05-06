const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const path = require('path');
const compression = require('compression');

const app = express();

const isProduction = process.env.NODE_ENV === 'production';

app.use('/', express.static(path.resolve(process.cwd(), 'public')));

if (!isProduction) {
  const config = require('../configs/webpack.dev.config.js');
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
} else {
  const build = path.resolve(process.cwd(), 'dist');
  app.use(compression());
  app.use('/', express.static(build));
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
  });
}

app.listen(process.env.PORT || 3000, () => {
  console.log('Started at 3000')
});
