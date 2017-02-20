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
    console.log('signin');
    passport.authenticate('local-signin', function(err, user, info) {
      if (err || !user) {
	if (err) {
	  console.log('err:', err);
	}
	res.status(401).json({error: "Invalid login"});
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

  router.post('/', function(req, res, next) {
    console.log('signup');
    passport.authenticate('local-signup', function(err, user, info) {
      if (err || !user) {
	if (err) {
	  console.log('err:', err);
	}
	res.status(401).json({error: "An account with that username or email already exists."});
      } else {
	req.login(user, function(err) {
          if (err) {
	    res.json({error: err || 'Unable to signin'});
	  } else {
	    res.json(user);
	  }
	});
      }
    })(req, res, next);
  });

  router.get('/me', function(req, res, next) {
    return res.json(req.user || {});
  });

  router.delete('/session', function(req, res, next) {
    req.logout();
    return res.json({success: "Logged out"});
  });

  router.delete('/me', function (req, res, next) {
    User.find(req.user.id).fetch().destroy().then(function(user) {
      res.json(user);
    }).catch(function(err) {
      console.log('delete /me error:', err);
      res.status(500).json({
	error: err
      });
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
      username: req.body.username.toLowerCase(),
      email: req.body.email.toLowerCase()
    }).save().then(function() {
      res.json({});
    });
  });

  return router;

};

module.exports = usersApi;
