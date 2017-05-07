const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const path = require('path');
const compression = require('compression');

const app = express();

const isProduction = process.env.NODE_ENV === 'production';

app.use('/assets', express.static(path.resolve(process.cwd(), 'public')));

if (!isProduction) {
  const config = require('../configs/webpack.dev.config.js');
  const compiler = webpack(config);
  const devMiddleWare = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    silent: true,
    noInfo: true,
    stats: {
      'errors-only': true,
      color: true,
    },
    hot: true,
    historyApiFallback: true,
  });

  app.use(devMiddleWare);

  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }));
  const fs = devMiddleWare.fileSystem;
  // Send the new index.html file everytime and react-router takes care of routing
  app.get('*', function (req, res) {
    fs.readFile(path.resolve(__dirname, '..', 'dist', 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });
} else {
  const build = path.resolve(process.cwd(), 'dist');
  app.use(compression());
  app.use('/', express.static(build));
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
  });
}

app.listen(process.env.PORT || 3000, () => {
  console.log('Started at 3000');
});
