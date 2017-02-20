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

  router.post('/:userId/reset-password', function(req, res, next) {
    console.log('token reset-password:', req.params.userId, req.body.token);
    User.where({
      id: req.params.userId
    }).fetch().then(function(user) {
      if (!user) {
	res.status(406).json({
	  error: 'Unable to find user.'
	});
      } else {
	console.log('found user:', JSON.stringify(user));
	var hashed_pass = bcrypt.hashSync(req.body.password, 8);
	user.attributes.hashed_pass = hashed_pass;
	user.attributes.password_reset_token = null;
	user.save().then(function(user) {
	  res.json({
	    status: 'OK'
	  });
	}).catch(function(err) {
	  res.status(500).json({
	    error: err
	  });
	});
      }
    }).catch(function(err) {
      res.status(500).json({
	error: 'There was an error processing your request: ' + err
      });
    });
  });
  
  router.post('/reset-password', function(req, res, next) {
    console.log('reset-password:', JSON.stringify(req.body));
    if (req.user) {
      res.status(400).json({
	error: 'You must log out before resetting your password.'
      });
    } else if (!req.body.emailOrUsername) {
      res.status(406).json({
	error: 'Email or Username is required'
      });
    } else {
      validate.userOrEmailExists(req.body.emailOrUsername).then(function(user) {
	user.attributes.password_reset_token = token.passwordResetToken();
	return user.save();
      }).then(function(user) {
	return mailer.sendPasswordResetEmail(user.id, user.attributes.email, user.attributes.password_reset_token);
      }).then(function() {
	res.json({status: 'OK'});
      }).catch(function(err) {
	console.log('err:', err);
	res.status(500).json({error: 'An error occured while processing that request: ' + err});
      });
    }
  });

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
