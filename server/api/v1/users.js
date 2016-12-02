var express = require('express');
var router = express.Router();
var validate = require('../../lib/user_validation');
var auth = require('../../middleware/auth');
var multiline = require('multiline');
var _ = require('lodash');
var bookshelf = require('../../config/connection');
var User = require('../../models/user');
var bcrypt = require('bcrypt');

var usersApi = function(passport) {

  var userAsJson = function(user) {
    var email = user.email;
    if (email === "" || email === null) {
      email = undefined;
    }
    return {
      id: user.id,
      admin: user.admin === true,
      username: user.username,
      completed_demographics: user.completed_demographics,
      email: email
    };
  };

  router.get('/stats', function(req, res, next) {

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
            res.json(userAsJson(user));
	  }
	});
      }
    })(req, res, next);
  });

  router.post('/', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      if (err || !user) {
	res.status(401).json( {error: "Invalid login"} );
      } else {
	req.login(user, function(err) {
          if (err) {
	    next(err);
	  }
	  res.json(userAsJson(user));
	});
      }
    })(req, res, next);
  });

  router.get('/me', auth.ensureLoggedIn, function(req, res, next) {
    return res.json(req.user);
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
