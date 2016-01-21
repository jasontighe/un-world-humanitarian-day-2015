var paths = {};


paths['/'] = 'HomePage';
paths['/damascus'] = 'StoryDamascus';
paths['/trekking'] = 'StoryMountainExpress';
paths['/surviving'] = 'StorySurvivingNepalQuake';
paths['/circus'] = 'StoryCircus';
paths['/whitehelmets'] = 'StoryWhiteHelmets';
paths['/skateistan'] = 'StorySkateistan';
paths['/about'] = 'AboutPage';


var locales = ['en', 'fr', 'es', 'ar', 'zh'];
var networks = ['twitter', 'facebook', 'weibo'];

var sections = [
  {
    pathname: '',
    component: 'HomePage'
  },
  {
    pathname: 'donate',
    component: 'DonatePage'
  },
  {
    pathname: 'about',
    component: 'AboutPage'
  }
];

var locale;
var network;

//createDonatePaths('donate', 'DonatePage');
createPaths();

function createPaths() {
  //console.log('DefaultComponents.createPaths - sections: ', sections );
  var path;
  for(var i = 0; i < sections.length; i++) {
    var component = sections[i].component;
    var pathname = sections[i].pathname;
    //var segment = [];
    //segment.push(pathname);
    path = `/${pathname}`;
    paths[path] = component;
    //console.log('DefaultComponents.createPaths - path: ', path );
    if( pathname !== '' ) {
      path = `/${pathname}/`;
      paths[path] = component;
      //console.log('DefaultComponents.createPaths - path: ', path );
    }

    ////console.log('DefaultComponents.createPaths - component: ', component );
    ////console.log('DefaultComponents.createPaths - pathname: ', pathname );
    for( var j = 0; j < locales.length; j++ ){
      locale = locales[j];
      ////console.log('DefaultComponents.createPaths - locale: ', locale );
      if( pathname === '' ) {
        path = `/${pathname}${locale}`;
        paths[path] = component;
        //console.log('DefaultComponents.createPaths - path: ', path );
        path = `/${pathname}${locale}/`;
        paths[path] = component;
        //console.log('DefaultComponents.createPaths - path: ', path );
      }
      else {
        path = `/${pathname}/${locale}`;
        paths[path] = component;
        //console.log('DefaultComponents.createPaths - path: ', path );
        path = `/${pathname}/${locale}/`;
        paths[path] = component;
        //console.log('DefaultComponents.createPaths - path: ', path );
      }
      for( var k = 0; k < networks.length; k++ ){
        if( pathname === 'donate' ) {
          network = networks[k];
          path = `/${pathname}/${locale}/${network}`;
          paths[path] = component;
          //console.log('DefaultComponents.createPaths - path: ', path );
          path = `/${pathname}/${locale}/${network}/`;
          paths[path] = component;
          //console.log('DefaultComponents.createPaths - path: ', path );
          path = `/${pathname}/${locale}/${network}/thankyou`;
          paths[path] = component;
          //console.log('DefaultComponents.createPaths - path: ', path );
          path = `/${pathname}/${locale}/${network}/thankyou/`;
          paths[path] = component;
          //console.log('DefaultComponents.createPaths - path: ', path );
          path = `/${pathname}/${locale}/${network}/error`;
          paths[path] = component;
          //console.log('DefaultComponents.createPaths - path: ', path );
          path = `/${pathname}/${locale}/${network}/error/`;
          paths[path] = component;
          //console.log('DefaultComponents.createPaths - path: ', path );
        }
      }
    }
  }
}

//function createDonatePaths(section, page) {
//    var path;
//    path = '/' + section;
//    paths[path] = page;
//    ////console.log('DefaultComponents.createSocialPaths - path: ', path );
//    path = '/' + section + '/';
//    paths[path] = page;
//    ////console.log('DefaultComponents.createSocialPaths - path: ', path );
//
//    for(var i = 0; i < locales.length; i++) {
//      path = '/' + section + '/' + locales[i];
//      paths[path] = 'DonatePage';
//      ////console.log('DefaultComponents.createSocialPaths - path: ', path );
//      path = '/' + section + '/' + locales[i] + '/';
//      paths[path] = 'DonatePage';
//      ////console.log('DefaultComponents.createSocialPaths - path: ', path );
//      for( var j = 0; j < networks.length; j++ ){
//        path = '/' + section + '/' + locales[i] + '/' + networks[j];
//        paths[path] = page;
//        ////console.log('DefaultComponents.createSocialPaths - path: ', path );
//        path = '/' + section + '/' + locales[i] + '/' + networks[j] + '/';
//        paths[path] = page;
//        ////console.log('DefaultComponents.createSocialPaths - path: ', path );
//        path = '/' + section + '/' + locales[i] + '/' + networks[j] + '/thankyou';
//        paths[path] = page;
//        ////console.log('DefaultComponents.createSocialPaths - path: ', path );
//        path = '/' + section + '/' + locales[i] + '/' + networks[j] + '/thankyou/';
//        paths[path] = page;
//        ////console.log('DefaultComponents.createSocialPaths - path: ', path );
//
//        path = '/' + section + '/' + locales[i] + '/' + networks[j] + '/error';
//        paths[path] = page;
//        ////console.log('DefaultComponents.createSocialPaths - path: ', path );
//        path = '/' + section + '/' + locales[i] + '/' + networks[j] + '/error/';
//        paths[path] = page;
//        ////console.log('DefaultComponents.createSocialPaths - path: ', path );
//        ////console.log(' ');
//      }
//    }
//}

export default paths;
