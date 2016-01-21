var models = require('./../models');
var async = require('async');
var _ = require('lodash');
var NodeCache = require('node-cache');
var myCache = new NodeCache();
var moment = require('moment');

var whdControllers = {
  //gets last 50 users
  getLatestUsers: function(req, res){
    var cached = myCache.get('latestusers');
    if (cached !== undefined){
      return res.json(cached);
    }

    models.User.findAll({
        limit: 50,
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'givenName', 'createdAt']
      })
      .then(function(users){
        users = _.map(users, function(user){
          user = user.dataValues;
          user.createdAt = moment(user.createdAt).format('M.DD hh:mmA');
          return user;
        });
        myCache.set('latestusers', users, 180);
        res.json(users);
      })
      .catch(function(err){
        res.json({
                status: 'error',
                message: err
            });
      });
  },

  //adds email to email table
  addEmail: function(req, res){
    console.log('parms', req.body);
    if (!req.body.email){
      res.json({
        status: 'error',
        message: 'No email posted.'
      });
    }

    models.Email.findOrCreate({
      where: {
        email: req.body.email
      }
    })
    //.then(function(email){ JPT_ALT REMOVED EMAIL
      .then(function(){
        return res.json({status: 'ok'});
      })
      .catch(function(err){
        return res.json({status: 'error', message: err});
      });
  },

  //gets total message count
  getMessageCount: function(req, res){
    var cached = myCache.get('messagecount');
    if (cached !== undefined){
      return res.json(cached);
    }

    models.UserMessage.count()
      .then(function(c){
        myCache.set('messagecount', { count: c }, 180);
        return res.json({ count: c });
      })
      .catch(function(err){
        return res.json({
          status: 'error',
          message: err});
      });
  },

  //gets a random story and the associated message
  getStory: function(req, res){
    //if user requests a different story
    var ignore = req.query.next || -1;
    if (isNaN(ignore)) {
      ignore = -1;
    }

    models.Story.find({
      where: {
        source: req.params.network,
        locale: req.params.locale,
        id: {$ne: parseInt(ignore)}
      },
      order: [
        models.Sequelize.fn( 'RAND' )
      ]
    })
    .then(function(story){
      story.getMessages({
        order: 'createdAt'
      }).then(function(messages){
        story = story.dataValues || {};
        story.messages = _.map(messages, function(message){ return message.dataValues; });
        return res.json(story);
      }).catch(function(err){
        return res.json({status: 'error', message: err});
      });
    })
    .catch(function(err){
      return res.json({status: 'error', message: err});
    });
  },

  addUserMessages: function(req, res){
    if (!req.user || !req.body.messages){
      return res.json({
        status: 'error',
        message: 'invalid parameters'
      });
    }

    var userId = req.user.id;
    var messages = req.body.messages;
    var i = 0;

    var lastSendTime = function(cb){
      models.UserMessage.max('sendDate', 
        {where: {'UserId': userId} }
      ).then(function(maxDate){
        return cb(null, maxDate);
      }).catch(function(err){
        return cb(err);
      });
    };

    lastSendTime(function(err, max){
      if (err){
        return res.json({status: 'error', message: err});
      }

      var current = new Date();
      var now = max || current;

      //check that times aren't in the past
      if (now < current){
        now = current;
      }

      //gets the message and adds to the usermessage table
      var createUserMessage = function(message, cb)
      {
        now.setTime(now.getTime() + ( i * 61 * 60 * 1000 ));
        console.log('now', now);
        i++;
        models.Message.findById(message.id)
          .then(function(found){
            //if (found.text !== message.message)
            //  return cb(null, found);
            models.UserMessage.create({
              UserId: userId,
              sent: false,
              message: message.message,
              image: found.image,
              sendDate: now
            })
            .then(function(created){
              return cb(null, created);
            })
            .catch(function(err){
              return cb(err);
            });
          })
          .catch(function(err){
            return cb(err);
          });
      };

      //async.map(messages, createUserMessage, function(err, messages){  JPT_ALT MESSAGES REMOVED FOR LINTING
      async.map(messages, createUserMessage, function(err){
        if (err){
          return res.json({status: 'error', message: err});
        }

        return res.json({status: 'ok'});
      });
    });
    
  }
};

export default whdControllers;
