var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var bcrypt = require('bcrypt');

router.post('/', function(req, res, err) {
  var hashed_pass = bcrypt.hashSync(req.body.password, 8);
  console.log('hashed_pass', hashed_pass);
  User.where({
    admin: true
  }).count().then(function(adminCount) {
    console.log("adminCount:", adminCount);
    if (adminCount == "0") {
      new User({
	username: req.body.username,
	email: req.body.email,
	hashed_pass: hashed_pass,
	admin: true
      }).save().then(function() {
	res.json({});
      });
    } else {
      res.status(401).send("not authorized");
    }
  });
});

module.exports = router;
