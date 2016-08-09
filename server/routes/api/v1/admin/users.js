var express = require('express');
var router = express.Router();
var createAdmin = require('../../../../lib/create_admin');
var auth = require('../../../../middleware/auth/index');
var bookshelf = require('../../../../config/connection');

router.post('/', auth.ensureLoggedIn, auth.ensureAdmin, function(req, res, next) {
  createAdmin(req.body.username, req.body.password, req.body.email).then(function(admin) {
    res.send({id: admin.attributes.id, username: admin.attributes.username});
  }).catch(function(error) {
    res.status(500).send({error: "Could not create an admin"});
  });
});

router.get('/', auth.ensureLoggedIn, auth.ensureAdmin, function(req, res, next) {
  bookshelf.knex.select('id', 'username').from('users').where('admin', true).then(function(data) {
    res.send(data);
  }).catch(function(error) {
    res.status(500).send({error: error})
  });
});

router.delete('/:id', auth.ensureLoggedIn, auth.ensureAdmin, function(req, res, next) {
  bookshelf.knex.del().from('users').where({admin: true, id: req.params.id}).then(function(data) {
    res.send({id: req.params.id});
  }).catch(function(error) {
    res.status(500).send({error: error});
  })
});

module.exports = router;
