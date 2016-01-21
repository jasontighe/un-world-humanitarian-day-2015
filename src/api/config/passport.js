var passport = require('passport');
var WeiboStrategy = require('passport-sina').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var FacebookExtension = require('passport-facebook-extension');
var models = require('./../models');
var config = require('./oauth-config');
var _ = require('lodash');

module.exports = function(){

  var env = process.env.NODE_ENV || 'local';

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  passport.use( new FacebookStrategy({
    clientID: config.facebook[env].clientID,
    clientSecret: config.facebook[env].clientSecret,
    callbackURL: config.facebook[env].callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      var FBExtension = new FacebookExtension(config.facebook[env].clientID, config.facebook[env].clientSecret);
      FBExtension.extendShortToken(accessToken)
        .then(function(response){
          models.User.find({
            where: {
              externalId: profile.id,
              source: 'facebook'
            }
          })
          .then(function(user){
            if (user){
              return done(null, user);
            }

            models.User.create({
              externalId: profile.id,
              source: 'facebook',
              displayName: profile.displayName,
              givenName: profile.displayName,
              token: response.access_token,
              //raw: JSON.stringify(profile._json)  :: JPT_ALT removed "_" from "_jason"
              raw: JSON.stringify(profile._json)
            })
            //.then(function(user){ :: JPT_ALT User is alreadt defined in the upper scope
            .then(function(created){
              return done(null, created);
            })
            .catch(function(err){
              return done(err);
            });
          });
        })
        .fail(function(error){
          console.log(error);
        });
    });
  }));

  passport.use(new TwitterStrategy({
    consumerKey: config.twitter[env].consumerKey,
    consumerSecret: config.twitter[env].consumerSecret,
    callbackURL: config.twitter[env].callbackURL
  },
  function(token, tokenSecret, profile, done) {
    process.nextTick(function () {

      models.User.find({
        where: {
          externalId: profile.id,
          source: 'twitter'
        }
      })
      .then(function(user){
        if (user){
          return done(null, user);
        }

        models.User.create({
          externalId: profile.id,
          source: 'twitter',
          displayName: profile.username,
          givenName: profile.displayName,
          token: token,
          tokenSecret: tokenSecret,
          //raw: JSON.stringify(profile._json) :: JPT_ALT removed "_" from "_jason"
          raw: JSON.stringify(profile._json)
        })
        //.then(function(user){ :: JPT_ALT User is alreadt defined in the upper scope
        .then(function(created){
          return done(null, created);
        }).catch(function(err){
          return done(err);
        });
      });
    });
  }));

  passport.use(new WeiboStrategy({
    clientID: config.weibo[env].clientID,
    clientSecret: config.weibo[env].clientSecret,
    callbackURL: config.weibo[env].callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {

      models.User.find({
        where: {
          externalId: profile.id,
          source: 'weibo'
        }
      })
      .then(function(user){
        if (user) {
          return done(null, user);
        }

        models.User.create({
          externalId: profile.id,
          source: 'weibo',
          displayName: profile.screen_name,
          givenName: profile.name,
          token: accessToken,
          //raw: JSON.stringify(profile._json) :: JPT_ALT removed "_" from "_jason"
          raw: JSON.stringify(profile._json)
        })
        //.then(function(user){  :: JPT_ALT removed "_" from "_jason"
        .then(function(created){
          return done(null, created);
        })
        .catch(function(err){
          return done(err);
        });
      });
    });
  }));
};
