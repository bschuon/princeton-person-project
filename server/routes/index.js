var express = require('express');
var router = express.Router();
var validUser = require('../lib/user_validation');
var createUser = require('../lib/create_user');
var config = require('../oauth.js')
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("index");
});

// Facebook Oauth

router.get('/auth/facebook',
passport.authenticate('facebook'),
function(req, res){
});

router.get('/auth/facebook/callback',
passport.authenticate('facebook', { failureRedirect: '/' }),
function(req, res) {
  req.session.currentUser = req.user.displayName;
  var user = validUser.userExists(req.user.displayName, function (user) {
    req.session.sess_id = user.id;
    res.redirect('/users/' + user.id);
  });
});

// serialize and deserialize
passport.serializeUser(function(user, done) {
done(null, user);
});
passport.deserializeUser(function(obj, done) {
done(null, obj);
});

// config
passport.use(new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackURL
},
function(accessToken, refreshToken, profile, done) {
  validUser.userExists(profile.displayName, function (result) {
    if(result){} else {
      var pw = process.env.FB_PW
      createUser(profile.displayName, pw, function () {});
    }
  });
  process.nextTick(function () {
    return done(null, profile);
 });
}
));

module.exports = router;
