/*
 * React.js Starter Kit
 * Copyright (c) Konstantin Tarkus (@koistya), KriaSoft LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import webpack, { DefinePlugin, BannerPlugin } from 'webpack';
import merge from 'lodash/object/merge';
import autoprefixer from 'autoprefixer-core';
import minimist from 'minimist';
import path from'path';
import gutil from 'gulp-util';
//import jquery from 'jquery';
//import slick from 'react-slick';

var node_modules_dir = path.resolve(__dirname, 'node_modules');
var bower_components_dir = path.resolve(__dirname, 'bower_components');

const argv = minimist(process.argv.slice(2));
const DEBUG = !argv.release;
const STYLE_LOADER = 'style-loader/useable';
const CSS_LOADER = DEBUG ? 'css-loader' : 'css-loader?minimize';
const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 20',
  'Firefox >= 24',
  'Explorer >= 8',
  'iOS >= 6',
  'Opera >= 12',
  'Safari >= 6'
];
const GLOBALS = {
  //'process.env.NODE_ENV': DEBUG ? '"dev"' : '"production"',
  //'process.env.NODE_ENV': DEBUG ? '"local"' : '"production"',
  '__DEV__': DEBUG
};

//
// Common configuration chunk to be used for both
// client-side (app.js) and server-side (server.js) bundles
// -----------------------------------------------------------------------------

const config = {
  output: {
    publicPath: './',
    sourcePrefix: '  '
  },

  cache: DEBUG,
  debug: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG
  },

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
    // 1. Prefer unminified CommonJS/AMD over dist
    //alias: {
    //  jquery: 'jquery/src/jquery',
    //  //reactSlick: 'react-slick/dist/react-slick',
    //  slickCarousel: 'slick-carousel/slick/slick'
    //}
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    //new webpack.ProvidePlugin({
    //  $: "jquery",
    //  jQuery: "jquery",
    //  "window.jQuery": "jquery",
    //  "root.jQuery": "jquery"
    //}),
    //new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.bundle.js')
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],

    loaders: [
      {
        test: /\.css$/,
        loader: `${STYLE_LOADER}!${CSS_LOADER}!postcss-loader`
      },
      //{
      //  test: /\.less$/,
      //  loader: `${STYLE_LOADER}!${CSS_LOADER}!postcss-loader!less-loader`
      //},
      {
        test: /\.scss$/,
        loader: `${STYLE_LOADER}!${CSS_LOADER}!postcss-loader!sass-loader`
      },
      {
        test: /\.gif/,
        loader: 'url-loader?limit=10000&mimetype=image/gif'
      },
      {
        test: /\.jpg/,
        loader: 'url-loader?limit=10000&mimetype=image/jpg'
      },
      {
        test: /\.png/,
        loader: 'url-loader?limit=10000&mimetype=image/png'
      },
      {
        test: /\.svg/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
      // 3. Use the imports-loader to configure this
      //{
      //  test: /[\/\\]node_modules[\/\\]jquery[\/\\]jquery\.js$/,
      //  loader: "imports?this=>window"
      //},
      // 4. Use the imports-loader to disable AMD
      //{
      //  test: /[\/\\]node_modules[\/\\]jquery[\/\\]jquery\.js$/,
      //  loader: "imports?define=>false"
      //},
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  postcss: [autoprefixer(AUTOPREFIXER_BROWSERS)]
};

//
// Configuration for the client-side bundle (app.js)
// -----------------------------------------------------------------------------

const appConfig = merge({}, config, {
  entry: {
    app: './src/app.js'
    //vendors: [
    //  //'jquery',
    //  //'reactSlick',
    //  //'slickCarousel'
    //  //'foundation',
    //  //'./node_modules/jquery/dist/jquery.js',
    //  //'./node_modules/slick-carousel/slick/slick.js'
    //  //'./node_modules/foundation/js/foundation-min.js'
    //]
  },
  output: {
    path: './build/public',
    filename: 'app.js'
  },
  devtool: DEBUG ? 'source-map' : false,
  plugins: config.plugins.concat([
    new DefinePlugin(merge(GLOBALS, {'__SERVER__': false}))
  ].concat(DEBUG ? [] : [
      // 2. Use the ProvidePlugin to inject implicit globals
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.AggressiveMergingPlugin()
    ])
  )
});

//
// Configuration for the server-side bundle (server.js)
// -----------------------------------------------------------------------------

const serverConfig = merge({}, config, {
  entry: './src/server.js',
  output: {
    path: './build',
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  externals: /^[a-z][a-z\.\-0-9]*$/,
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  },
  devtool: DEBUG ? 'source-map' : 'cheap-module-source-map',
  plugins: config.plugins.concat(
    new DefinePlugin(merge(GLOBALS, {'__SERVER__': true})),
    new BannerPlugin('require("source-map-support").install();',
      { raw: true, entryOnly: false })
  ),
  module: {
    loaders: config.module.loaders.map(function(loader) {
      // Remove style-loader
      return merge(loader, {
        loader: loader.loader = loader.loader.replace(STYLE_LOADER + '!', '')
      });
    })
  }
});

export default [appConfig, serverConfig];
