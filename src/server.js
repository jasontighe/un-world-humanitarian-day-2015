/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import 'babel/polyfill';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import favicon from 'serve-favicon';
import logger from 'morgan';
import passport from 'passport';
import React from 'react';
import './core/Dispatcher';
import './stores/AppStore';
import db from './core/Database';
import App from './components/App';
import models from './api/models';
import cronJob from './socialSender.js';
import dbConfig from './api/config/db-config';
import SessionStore from 'express-mysql-session';

const rebuildDB = false;
const server = express();

var env = process.env.NODE_ENV || 'local';
var sessionStore = new SessionStore({
    host: dbConfig[env].host,
    port: 3306,
    user: dbConfig[env].username,
    password: dbConfig[env].password,
    database: dbConfig[env].database
});

require('./api/config/passport')();

//
// Register API middleware
// -----------------------------------------------------------------------------
server.use(compression());
server.use(logger('dev'));
server.use(express.static(path.join(__dirname, 'public'), { maxAge: 86400000 }));
server.use(favicon(path.join(__dirname, '/public/favicon.ico')));
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(require('express-session')({
  secret: '90234890234890238423483924829348293482389',
  store: sessionStore,
  resave: true,
  saveUninitialized: true
}));
server.use(passport.initialize());
server.use(passport.session());
server.use('/api/query', require('./api/query'));
server.use('/', require('./api/routes'));

//server.set('view engine', 'jade');

server.set('port', (process.env.PORT || 5000));


//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------

// The top-level React component + HTML template for it
const templateFile = path.join(__dirname, 'templates/index.html');
const template = _.template(fs.readFileSync(templateFile, 'utf8'));

server.get('*', async (req, res, next) => {
  try {
    // TODO: Temporary fix #159
    await db.getPage(req.path).catch(async (err) => {
      if (err.code !== 'ENOENT') {
        console.error('Error: ', err);
      }
      await db.getPage('/');
    });
    let notFound = false;
    let css = [];
    let data = {description: ''};
    let app = (<App
        path={req.path}
        context={{
        onInsertCss: value => css.push(value),
        onSetTitle: value => data.title = value,
        onSetMeta: (key, value) => data[key] = value,
        onPageNotFound: () => notFound = true
      }} />);

    data.body = React.renderToString(app);
    data.css = css.join('');
    let html = template(data);
    if (notFound) {
      res.status(404);
    }
    res.send(html);
  } catch (err) {
    next(err);
  }
});

console.log('NODE ENV', process.env.NODE_ENV);

models.sequelize.sync({force: rebuildDB}).then(function(){
  server.listen(server.get('port'), () => {
    if (process.send) {
      process.send('online');
    } else {
      cronJob.start();
      console.log('The server is running at http://localhost:' + server.get('port'));
    }
  });
});
