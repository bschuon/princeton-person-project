var express = require('express');
var router = express.Router();
var validate = require('../../lib/user_validation');
var auth = require('../../middleware/auth');
var multiline = require('multiline');
var _ = require('lodash');
var bookshelf = require('../../config/connection');
var User = require('../../models/user');
var bcrypt = require('bcrypt');
var token = require('../../lib/token');
var mailer = require('../../lib/mailer');

var usersApi = function(passport) {

  router.post('/resend-verification-token', function(req, res, next) {
    console.log('resending verification token');
    User.where({
      id: req.user.id
    }).fetch().then(function(user) {
      user.attributes.email_verify_token = token.emailVerifyToken();
      return user.save();
    }).then(function(user) {
      return mailer.sendVerifyTokenEmail(user.attributes.email, user.attributes.email_verify_token);
    }).then(function() {
      res.json({
	status: 'OK'
      });
    }).catch(function(err) {
      console.log('resending verification token failed:', err);
      res.status(500).json({
	error: err
      });
    });
  });
  
  router.post('/verify', function(req, res, next) {
    console.log('req.user.id', req.user.id);
    console.log('req.body.token', req.body.token);
    User.where({
      id: req.user.id
    }).fetch().then(function(user) {
      user.verifyToken(req.body.token).then(function(user) {
	console.log('user.verifyToken resolved:', JSON.stringify(user));
	res.json(user);
      }).catch(function(err) {
	console.log('user.verifyToken rejected');
	res.status(406).json({error: err});
      });
    });
  });

  router.post('/signin', function(req, res, next) {
    passport.authenticate('local-signin', function(err, user, info) {
      if (err || !user) {
	res.status(401).json( {error: "Invalid login"} );
      } else {
	req.login(user, function(err) {
          if (err) {
	    next(err);
	  } else {
            res.json(user);
	  }
	});
      }
    })(req, res, next);
  });

  // signup
  router.post('/', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      if (err || !user) {
	res.status(401).json( {error: "Invalid login"} );
      } else {
	req.login(user, function(err) {
          if (err) {
	    next(err);
	  }
	  res.json(user);
	});
      }
    })(req, res, next);
  });

  router.get('/me', function(req, res, next) {
    return res.json(req.user || {});
  });

  router.delete('/session', auth.ensureLoggedIn, function(req, res, next) {
    req.logout();
    return res.json({success: "Logged out"});
  });

  router.delete('/me', auth.ensureLoggedIn, function (req, res, next) {
    new User({ id: req.params.user_id }).destroy().then(function(result) {
      res.json(result);
    });
  });

  router.put('/password', auth.ensurePasswordWithCredentials, function (req, res, next) {
    var hashed_pass = bcrypt.hashSync(req.body.new_password, 8);
    new User({id: req.user.id, hashed_pass: hashed_pass}).save().then(function() {
      res.json({});
    });
  });

  router.put('/profile', auth.ensurePasswordWithCredentials, function (req, res, next) {
    new User({
      id: req.user.id,
      username: req.body.username,
      email: req.body.email
    }).save().then(function() {
      res.json({});
    });
  });

  return router;

};

module.exports = usersApi;
