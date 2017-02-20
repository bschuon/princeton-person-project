var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var bcrypt = require('bcrypt');
var randomstring = require('randomstring');

router.post('/', function(req, res, err) {
  var hashed_pass = bcrypt.hashSync(req.body.password, 8);
  console.log('hashed_pass', hashed_pass);
  User.where({
    admin: true
  }).count().then(function(adminCount) {
    console.log("adminCount:", adminCount);
    if (adminCount == "0") {
      var email_verify_token = randomstring.generate({
	length: 12,
	charset: 'hex'
      });
      console.log("email_verify_token:", email_verify_token);
      new User({
	username: req.body.username,
	email: req.body.email,
	email_verify_token: email_verify_token,
	hashed_pass: hashed_pass,
	admin: true,
	researcher: true,
	bio: JSON.stringify({})	
      }).save().then(function() {
	res.json({});
      });
    } else {
      res.status(401).send("not authorized");
    }
  });
});

module.exports = router;
