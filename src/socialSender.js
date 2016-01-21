var models = require('./api/models');
var async = require('async');
var _ = require('lodash');
var fb = require('fb');
var twit = require('twitter');
var SinaWeibo = require('node-sina-weibo');
var config = require('./api/config/oauth-config');
var env = process.env.NODE_ENV || 'local';
var fs = require('fs');
var request = require('request');
var CronJob = require('cron').CronJob;
var log4js = require('log4js');
log4js.configure({
  appenders: [
    { type: 'file', filename: './build/public/cron.log', category: 'cron' }
  ]
});
var logger = log4js.getLogger('cron');
logger.setLevel('INFO');

var self = {

	getUserMessages: function(done){
		logger.info('beginning delivery');
		var now = new Date();
		var limit = new Date().setTime(now.getTime() - ( 2 * 60 * 60 * 1000 )); //3 hour window allows two tries
		models.UserMessage.findAll({
			where: {sent: false, sendDate: { $lte: now, $gte: new Date(limit)}}
		}).then(function(userMessages){
			//ensure uniqueness?
			//userMessages = _.uniq(_.copy(userMessages), 'id');
			async.map(userMessages, self.processUserMessage, done);
		}).catch(function(err){
			logger.error('There was an error retrieving user messages', err);
		});

	},

	processUserMessage: function(userMessage, done){

		async.waterfall([
				//get user
				function(cb){
					models.User.findById(userMessage.UserId).then(function(user){
						return cb(null, user, userMessage);
					}).catch(function(err){
						return cb(err);
					});
				},
				//send to appropriate network
				function(user, message, cb){
					logger.info('Posting to ' + user.source + ' for ' + user.givenName + ' messageid ' + message.id);
					switch(user.source){
						case 'facebook':
							self.doFacebookPost(user, message, cb);
							break;
						case 'twitter':
							self.doTwitterPost(user, message, cb);
							break;
						case 'weibo':
							self.doWeiboPost(user, message, cb);
							break;
						default:
							return cb('incorrect source!');
					}
				},
				//update sent value on message
				function(user, message, cb){
					models.UserMessage.update({
						sent: true
					},
					{
						where: {id: message.id}
					}).then(function(saved){
						return cb(null, user, message);
					}).catch(function(err){
						return cb(err);
					});
				}
			],
			//console log result
			function(err, user, message){
				if (err){
					logger.error('Error sending message', err);
				}
				else{
					logger.info('Posted Message ' + message.id + ' to: ' + user.givenName);
				}
				//always allow ok callback
				return done();
			});
	},


	doFacebookPost: function(user, message, cb){
		fb.setAccessToken(user.token);

		var opts = {message: message.message};
		if (message.image){
			opts.picture = message.image;
			opts.name = '';
			opts.caption = '     ';
			opts.description = '';
		}
		var regex = /((bit\.ly)\S*)\b/gi;
		var result = message.message.match(regex);
		if (result && result.length > 0){
			opts.link = result[0];
		}

		fb.api('me/feed', 'post', opts, function (res) {
			if(!res || res.error){
				return cb(!res ? 'error occurred' : res.error);
			}

			return cb(null, user, message);
		});
	},

	loadBase64Image: function (url, callback) {
		request({url: url, encoding: null}, function (err, res, body) {
			if (err || res.statusCode !== 200){
				return callback(err);
			}

			var image = body.toString('base64');
			return callback(null, image);
		});
	},

	doTwitterPost: function(user, message, cb){
		var opts = {
			consumer_key: config.twitter[env].consumerKey,
			consumer_secret: config.twitter[env].consumerSecret,
			access_token_key: user.token,
			access_token_secret: user.tokenSecret
		};
		if (process.env.QUOTAGUARDSTATIC_URL){
			opts.request_options = {proxy: process.env.QUOTAGUARDSTATIC_URL};
		}

		var T = new twit(opts);

		if (message.image){
			self.loadBase64Image(message.image, function (error, image) {
				if (error){
					return cb(error);
				}
				T.post('media/upload', { media_data: image }, function (err, data, response) {
					if (err){
						return cb(err);
					}
					// now we can reference the media and post a tweet (media will attach to the tweet)
					var mediaIdStr = data.media_id_string;
					var params = { status: message.message, media_ids: mediaIdStr };

					T.post('statuses/update', params, function (e, d, r) {
						if (e){
							return cb(e);
						}

						return cb(null, user, message);
					});
				});
			});
		}
		else{
			T.post('statuses/update', { status: message.message }, function(err, data, response) {
				if (err){
					return cb(err);
				}

				return cb(null, user, message);
			});
		}
	},

	doWeiboPost: function(user, message, cb){
		var weibo = new SinaWeibo(config.weibo[env].clientID, config.weibo[env].clientSecret, user.token);
		if (message.image){
			weibo.UPLOAD('statuses/upload', { status: message.message }, { pic: message.image }, function (err, resultInJson, response) {
				if (err){
					return cb(err);
				}

				return cb(null, user, message);
			});
		}
		else{
			weibo.POST('statuses/update', {status: message.message}, function (err, result, response) {
					if (err){
						return cb(err);
					}

					return cb(null, user, message);
			});
		}
	},

	start: function(){
		logger.info('starting new job');
		var job = new CronJob('0 * * * * *', function(){
			logger.info('starting delivery');
			self.getUserMessages(function(err, status){
				if (err){
					logger.error('ERR', err);
				}

				logger.info('done');
			});
		}, null, true, 'America/New_York');
	}
};


module.exports = self;

