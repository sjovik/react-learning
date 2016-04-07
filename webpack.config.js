const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
}

const common = {
  entry: PATHS.app,
  output: { path: PATHS.build, filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        } 
      },
      {
        test: /\.styl$/,
        loaders: ['style', 'css', 'stylus'],
        include: PATHS.app
      }
    ]
  },
};

if (TARGET === 'start' || !TARGET) {
  module.exports = _.assign(common, {
    devServer: {
      contentBase: PATHS.build,
      historyApiFallback: true,
      progress: true,
      stats: 'errors-only',
      colors: true
    }
  });
}

if (TARGET === 'build') {
  module.exports = common;
}


