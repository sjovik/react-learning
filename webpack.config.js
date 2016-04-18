const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

process.env.BABEL_ENV = TARGET;

const common = {
  entry: {
    app: PATHS.app
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.styl']
  },
  output: { 
    path: PATHS.build, 
    filename: 'bundle.js' 
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: PATHS.app,
        query: {
          cacheDirectory: true
        } 
      },
      {
        test: /\.css$/,
        loader: 'postcss-loader',
        include: PATHS.app
      }
    ]
  },
  postcss: function () {
    return [autoprefixer];
  } 
};

if (TARGET === 'start' || !TARGET) {
  const devSettings = Object.assign(common, {
    devServer: {
      contentBase: PATHS.app,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      colors: true,
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });

  devSettings.module.loaders.push({
    test: /\.styl$/,
    loaders: ['style','css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]','postcss', 'stylus'],
    include: PATHS.app
  });

  module.exports = devSettings;
}

if (TARGET === 'build') {
  const buildSettings = Object.assign(common, {
    plugins: [
      new ExtractTextPlugin('style.css'),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(PATHS.app, 'index.html')
      }),
      new webpack.optimize.UglifyJsPlugin()
    ]
  });

  buildSettings.output.filename = 'bundle.min.js';

  buildSettings.module.loaders.push({
    test: /\.styl$/,
    loader: ExtractTextPlugin.extract(
      'style-loader','css-loader?modules&importLoaders=1&localIdentName=[hash:base64:5]!postcss-loader!stylus-loader'),
    include: PATHS.app
  });

  module.exports = buildSettings;
}
