var express = require('express');
var router = express.Router();
var passport = require('passport');
var controller = require('./../controllers/whdController');

var getLocaleFromCookie = function(req){
  console.log('routes.index.getLocaleFromCookie - req.cookies.locale: ', req.cookies.locale);
  return req.cookies.locale || 'en';
};

//facebook
router.get('/auth/facebook', passport.authenticate('facebook', {scope: ['publish_actions']}));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/donate/' + getLocaleFromCookie(req) + '/facebook');
  });

//twitter
router.get('/auth/twitter/', passport.authenticate('twitter'));
router.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/error' }),
  function(req, res) {
    console.log('TWITTER CALLBACK *****************************************');
    res.redirect('/donate/' + getLocaleFromCookie(req) + '/twitter');
  });

// sina
router.get('/auth/weibo', passport.authenticate('sina'));
router.get('/auth/weibo/callback', passport.authenticate('sina', { failureRedirect: '/error'}),
  function(req, res) {
    res.redirect('/donate/' + getLocaleFromCookie(req) + '/weibo');
  });

//services
router.get('/api/latestusers', controller.getLatestUsers);
router.post('/api/addemail', controller.addEmail);
router.get('/api/messagecount', controller.getMessageCount);
router.get('/api/story/:locale/:network', controller.getStory);
router.post('/api/donate', controller.addUserMessages);

module.exports = router;
