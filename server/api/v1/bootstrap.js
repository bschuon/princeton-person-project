var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var bcrypt = require('bcrypt');
var mailer = require('../../lib/mailer');
var token = require('../../lib/token');

router.post('/', function(req, res, err) {
  var hashed_pass = bcrypt.hashSync(req.body.password, 8);
  console.log('hashed_pass', hashed_pass);
  User.where({
    admin: true    
  }).count().then(function(adminCount) {
    console.log("adminCount:", adminCount);
    if (adminCount == "0") {
      var email_verify_token = token.emailVerifyToken();
      console.log("email_verify_token:", email_verify_token);
      var userData = {
	username: req.body.username.toLowerCase(),
	email: req.body.email.toLowerCase(),
	email_verify_token: email_verify_token,
	hashed_pass: hashed_pass,
	admin: true,
	researcher: true,
	bio: JSON.stringify({})
      };
      console.log('userData:', JSON.stringify(userData));
      new User(userData).save().then(function(user) {
	return mailer.sendVerifyTokenEmail(user.attributes.email, user.attributes.email_verify_token).then(function() {
	  return user;
	});
      }).then(function(user) {
	res.json(user);
      });
    } else {
      res.status(401).send("not authorized");
    }
  });
});

module.exports = router;
