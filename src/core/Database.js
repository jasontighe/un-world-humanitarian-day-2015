/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import fs from 'fs';
import path from 'path';
import jade from 'jade';
import fm from 'front-matter';
import Dispatcher from './Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import DefaultComponents from '../content/DefaultComponents';

// A folder with Jade/Markdown/HTML content pages
const CONTENT_DIR = path.join(__dirname, './content');

// Check if that directory exists, print an error message if not
fs.exists(CONTENT_DIR, (exists) => {
  if (!exists) {
    console.error(`Error: Directory '${CONTENT_DIR}' does not exist.`);
  }
});

// Extract 'front matter' metadata and generate HTML
function parseJade(uri, jadeContent) {
  let content = fm(jadeContent);
  let html = jade.render(content.body, null, '  ');
  let page = Object.assign({path: uri, content: html}, content.attributes);
  return page;
}

export default {

  getPage: (uri) => {
    // Read page content from a Jade file
    console.log('Database.getPage - uri: ', uri);
    return new Promise((resolve, reject) => {
      // page is dynamic, does not exist in the database
      if(DefaultComponents[uri]) {
        //console.log('Database.getPage - DefaultComponents[uri]: ', DefaultComponents[uri]);
        resolve({
          path: '/',
          component: DefaultComponents[uri]
        });
      } else {
        let fileName = path.join(CONTENT_DIR, (uri === '/' ? '/index' : uri) + '.jade');
        fs.readFile(fileName, {encoding: 'utf8'}, (err, data) => {
          if (!err) {
            resolve(parseJade(uri, data));
          } else {
            reject(err);
          }
        });
      }
    }).then((page) => {
      Dispatcher.dispatch({
        type: ActionTypes.RECEIVE_PAGE,
        page: page
      });
      console.log('Database.Dispatcher.dispatch - RECEIVE_PAGE page: ', page);
      return Promise.resolve(page);
    });
  }

};

