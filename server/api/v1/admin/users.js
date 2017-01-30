var express = require('express');
var router = express.Router();
var auth = require('../../../middleware/auth/index');
var bookshelf = require('../../../config/connection');
var bcrypt = require('bcrypt');
var User = require('../../../models/user');
var h = require('../helpers');

router.post('/', auth.ensureLoggedIn, auth.ensureAdmin, function(req, res, next) {
  console.log(JSON.stringify(req.body));
  var hashed_pass = bcrypt.hashSync(req.body.password, 8);
  new User({
    username: req.body.username,
    hashed_pass: hashed_pass,
    email: req.body.email,
    admin: req.body.admin
  }).save().then(function(admin) {
    res.send(admin.serialize());
  }).catch(function(error) {
    console.log("error:", error);
    res.status(500).send({error: "Could not create an admin"});
  });
});

router.get('/', auth.ensureLoggedIn, auth.ensureAdmin, function(req, res, next) {
  bookshelf.knex.select().from('users').then(function(data) {
    res.send(data);
  }).catch(function(error) {
    res.status(500).send({error: error});
  });
});

router.get('/:id', auth.ensureLoggedIn, auth.ensureAdmin, function(req, res, next) {
  h.fetchUser(req.params.id).then(h.returnModel(res)).catch(h.handleError(res));
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
