import cookie from 'react-cookie';


function getURLFromPath(path, _name) {
  var name = _name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(path);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function getLangaugeFromPath(path) {
  //console.log('helpers.getLangaugeFromPath - path: ', path );
  var locale = 'en';
  var paths = path.split('/');
  var section;
  //  // If three sections, language and or network has been set
  //console.log('helpers.getLangaugeFromPath - paths.length: ', paths.length);
  //console.log('');
  for( var i = 0; i < paths.length; i++ ){
    section = paths[i];
    //console.log('helpers.getLangaugeFromPath - section: ', section);
  }
  if( paths.length >= 3 ) {
    locale = paths[2];
  }
  //console.log('');
  //console.log('helpers.getLangaugeFromPath - SAVE COOKIE locale: ', locale );
  cookie.save('locale', locale, {path: '/'});
  return locale;
}

function getSocialNetworkFromPath(path) {
  //console.log('helpers.getSocialNetworkFromPath - path: ', path );
  var network = '';
  var paths = path.split('/');
  //  // If three sections, language and or network has been set
  if( paths.length >= 4 ) {
    //var lastIndex = paths.length - 1;
    var lastString = paths[3];
    ////console.log('helpers.getSocialNetworkFromPath - lastString.indexOf("facebook"): ', lastString.indexOf('facebook') );
    //console.log('helpers.getSocialNetworkFromPath - paths.length: ', paths.length );
    //console.log('helpers.getSocialNetworkFromPath - lastString: ', lastString);

    if( lastString.indexOf('facebook') > -1 ){
      network = 'facebook';
    }
    else if( lastString.indexOf('twitter') > -1){
      network = 'twitter';
    }
    else if( lastString.indexOf('weibo') > -1 ){
      network = 'weibo';
    }
  }

  return network;
}


/*******************************/
function getCurrentPaths() {
  //console.log('Navigation.getCurrentPath - window.location: ', window.location );
  //console.log('Navigation.getCurrentPath - window.location.href: ', window.location.href );
  //console.log('Navigation.getCurrentPath - window.location.host: ', window.location.host );
  //console.log('Navigation.getCurrentPath - window.location.origin: ', window.location.origin );
  //console.log('Navigation.getCurrentPath - window.location.pathname: ', window.location.pathname );
  //console.log('Navigation.getCurrentPath - window.location.pathname: ', window.location.pathname );
  var paths = window.location.pathname.split('/');
  //console.log('helpers.getCurrentPaths - paths: ', paths );
  return paths;
}
function getCurrentPathsWithPath(path) {
  //console.log('Navigation.getCurrentPath - window.location: ', window.location );
  //console.log('Navigation.getCurrentPath - window.location.href: ', window.location.href );
  //console.log('Navigation.getCurrentPath - window.location.host: ', window.location.host );
  //console.log('Navigation.getCurrentPath - window.location.origin: ', window.location.origin );
  //console.log('Navigation.getCurrentPath - window.location.pathname: ', window.location.pathname );
  //console.log('Navigation.getCurrentPath - window.location.pathname: ', window.location.pathname );
  var paths = path.split('/');
  //console.log('helpers.getCurrentPaths - paths: ', paths );
  return paths;
}

function isInSection(paths) {
  var isSection = false;
  if( paths[1].indexOf('donate') > -1 ||
      paths[1].indexOf('about') > -1 ||
      paths[1].indexOf('damascus') > -1 ||
      paths[1].indexOf('trekking') > -1 ||
      paths[1].indexOf('circus') > -1 ||
      paths[1].indexOf('whitehelmets') > -1 ||
      paths[1].indexOf('skateistan') > -1 ||
      paths[1].indexOf('surviving') > -1 ||
      paths[1].indexOf('thankyou') > -1 ){
    isSection = true;
  }
  return isSection;
}

function getCurrentSection(paths) {
  //console.log('Navigation.getCurrentSection - paths: ', paths );
  var section;
  if( isInSection(paths)){
    section = paths[1];
  }
  else {
    section = '';
  }
  //console.log('helpers.getCurrentSection - section: ', section );
  return section;
}

function getCurrentLocale(paths) {
  //console.log('Navigation.getCurrentLocale - paths: ', paths );
  //var locale = (paths.length > 2 ) ? paths[2] : paths[1];
  var locale = '';
  if( isInSection(paths)){
    if(paths.length > 2) {
      locale = paths[2];
      //console.log('Navigation.getCurrentLocale - CASE 1');
    }
  }
  else{
    //console.log('Navigation.getCurrentLocale - CASE 2');
    locale = paths[1];
  }
  if(locale === '' ){
    locale = 'en';
  }
  cookie.save('locale', locale, {path: '/'});
  console.log('helpers.getCurrentLocale - locale: ', locale );
  return locale;
}

/*******************************/

var helpers = {

  getURLPath() {
    var path = window.location.pathname;
    return path;
  },

  getURLParam(path, name) {
    var paramName = getURLFromPath(path, name);
    return paramName;
  },

  getDonateParams(path) {
    //console.log('helpers.getDonateParams - path: ', path );
    var params = [];
    var language = getLangaugeFromPath(path);
    var network = getSocialNetworkFromPath(path);
    params[0] = language;
    params[1] = network;
    return params;
  },

  getPageParams() {
    //console.log('helpers.getPageParams');
    var params = [];
    var paths = getCurrentPaths();
    var section = getCurrentSection(paths);
    var locale = getCurrentLocale(paths);
    params[0] = paths;
    params[1] = section;
    params[2] = locale;
    return params;
  },

  getPageParamsWithPath(path) {
    //console.log('helpers.getPageParams');
    var params = [];
    var paths = getCurrentPathsWithPath(path);
    var section = getCurrentSection(paths);
    var locale = getCurrentLocale(paths);
    params[0] = paths;
    params[1] = section;
    params[2] = locale;
    return params;
  },
/*
  getUserStartTime(timestamp) {
    var d = new Date(timestamp);
    var time = ( d.getMonth() + 1 ) +
        '.' + ( d.getDate() + 1 ) +
        '.' + (d.getFullYear()).toString().slice(2, 4) +
        ' ' + d.toLocaleTimeString().slice(0, 4) +
        d.toLocaleTimeString().slice(8, 10);
    //console.log('date: '+ date);
    //var time = d.toLocaleTimeString();
    //var userStartTime = date + ' ' + time;
    return time;
  },*/

  breakUsernames(name) {
    var html = name.split(' ').join('<br />');
    return html;
  },

  getNamesArr(name) {
    var html = name.split(' ');
    return html;
  }
};


export default helpers;
