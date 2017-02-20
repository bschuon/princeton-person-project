var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var validate = require('../lib/user_validation');
var bcrypt = require('bcrypt');
var randomstring = require('randomstring');
var mailer = require('../lib/mailer');

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
      emailVerified: user.attributes.email_verified === true
      // id: user.attributes.id,
      // username: user.attributes.username,
      // admin: user.attributes.admin,
      // email: user.attributes.email
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

  // Local signup.  Used for creating a user, no
  passport.use('local-signup', new LocalStrategy({
    passReqToCallback : true
  }, function(req, username, password, done) {
    validate.userExists(username).then(function(results) {
      if (results) {
	return done(null, false, {error: 'Incorrect username or password'});
      }
      var hashed_pass = bcrypt.hashSync(password, 8);
      var email_verify_token = randomstring.generate({
	length: 12,
	charset: 'hex'
      });
      console.log("email_verify_token:", email_verify_token);
      return new User({
	username: username,
	email: req.body.email,
	email_verify_token: email_verify_token,
	hashed_pass: hashed_pass,
	admin: false,
	researcher: false,
	email_verified: false,
	bio: JSON.stringify({})
      }).save().then(function(user) {
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
