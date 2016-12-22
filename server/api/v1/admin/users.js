var express = require('express');
var router = express.Router();
var auth = require('../../../middleware/auth/index');
var bookshelf = require('../../../config/connection');
var bcrypt = require('bcrypt');
var User = require('../../../models/user');

router.post('/', auth.ensureLoggedIn, auth.ensureAdmin, function(req, res, next) {
  var hashed_pass = bcrypt.hashSync(req.body.password, 8);
  new User({
    username: req.body.username,
    hashed_pass: hashed_pass,
    email: req.body.email,
    admin: true
  }).save().then(function(admin) {
    res.send({id: admin.attributes.id, username: admin.attributes.username});
  }).catch(function(error) {
    res.status(500).send({error: "Could not create an admin"});
  });
});

router.get('/', auth.ensureLoggedIn, auth.ensureAdmin, function(req, res, next) {
  bookshelf.knex.select('id', 'username').from('users').then(function(data) {
    res.send(data);
  }).catch(function(error) {
    res.status(500).send({error: error});
  });
});

router.delete('/:id', auth.ensureLoggedIn, auth.ensureAdmin, function(req, res, next) {
  bookshelf.knex.del().from('users').where({
    id: req.params.id
  }).then(function(data) {
    res.send({id: req.params.id});
  }).catch(function(error) {
    res.status(500).send({error: error});
  });
});

module.exports = router;
