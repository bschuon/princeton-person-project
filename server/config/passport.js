var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var validate = require('../lib/user_validation');
var bcrypt = require('bcrypt');
var mailer = require('../lib/mailer');
var token = require('../lib/token');

// expose this function to our app using module.exports
module.exports = function(passport) {

  function userToJSON(user) { // TODO: extract to helper / user model
    return {
      id: user.id,
      admin: user.attributes.admin === true,
      researcher: user.attributes.researcher === true,
      username: user.attributes.username,
      bio: user.attributes.bio,
      email: user.attributes.email || null,
      email_verified: user.attributes.email_verified === true
    };
  }
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    new User({id: id}).fetch().then(function(user) {
      if (user) {
        done(null, userToJSON(user));
      } else {
        done(null, false);
      }
    }).catch(function(err) {
      done(err, null);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    passReqToCallback : true
  }, function(req, username, password, done) {
    validate.userOrEmailExists(username.toLowerCase()).then(function(results) {
      if (results) {
	return done(null, false, {error: 'Incorrect username or password'});
      }
      var hashed_pass = bcrypt.hashSync(password, 8);
      var email_verify_token = token.emailVerifyToken();
      console.log("email_verify_token:", email_verify_token);
      var userData = {
	username: username.toLowerCase(),
	email: req.body.email.toLowerCase(),
	email_verify_token: email_verify_token.toLowerCase(),
	hashed_pass: hashed_pass,
	admin: false,
	researcher: false,
	email_verified: false,
	bio: JSON.stringify({})
      };
      console.log('userData:', JSON.stringify(userData));
      return new User(userData).save().then(function(user) {
	console.log('created user:', JSON.stringify(user));
	return mailer.sendVerifyTokenEmail(user.attributes.email, user.attributes.email_verify_token).then(function() {
	  return user;
	});
      }).then(function(user) {
	return done(null, user.serialize(), {success: "Logging in"});
      });
    }).catch(function(error) {
      console.log('error:', error);
      return done(error);
    });
  }));
  
  passport.use('local-signin', new LocalStrategy({
    passReqToCallback : true
  }, function(req, username, password, done) {
    username = username.toLowerCase();
    console.log('local-signin:', username);
    validate.userOrEmailExists(username).then(function(user) {
      if (user && validate.checkPassword(password, user.attributes)) {
	return done(null, user.attributes, {success: "Logged in"});
      } else {
	return done(null, false, {error: 'Incorrect username or password'});
      }
    }).catch(function(error) {
      return done(error);
    });
  }));
};
