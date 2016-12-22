var express = require('express');
var router = express.Router();
var Survey = require('../../../models/survey');

router.get('/', function(req, res) {
  Survey.fetchAll().then(function(data) {
    res.json({
      valid: true,
      data: data || []
    });
  }).catch(function(err) {
    console.log(err);
    res.json({
      valid: false,
      error: err.message || err
    });
  });
});

router.get('/:id', function(req, res) {
  Survey.where({
    id: parseInt(req.params.id, 10)
  }).fetch().then(function(model) {
    res.json({
      valid: true,
      model: model
    });
  }).catch(function(err) {
    console.log(err);
    res.json({
      valid: false,
      error: err.message || err
    });
  });
});

router.post('/', function(req, res) {
  new Survey({
    name: req.body.name,
    version: 0,
    status: 'draft',
    est_time: req.body.est_time, // in seconds
    schema: req.body.schema || "{}"
  }).save().then(function(model) {
    res.json({
      valid: true,
      model: model
    });
  }).catch(function(err) {
    console.log(err);
    res.json({
      valid: false,
      error: err.message || err
    });
  });
});

router.post('/:id', function(req, res) {
  // var id = parseInt(req.params.id);
  // TODO: handle version
  new Survey({
    version: parseInt(req.body.version),
    est_time: req.body.est_time,
    name: req.body.name,
    schema: req.body.schema
  }).save().then(function(model) {
    res.json({
      valid: true,
      model: model
    });
  }).catch(function(err) {
    console.log(err);
    res.json({
      valid: false,
      error: err.message || err
    });
  });
});

module.exports = router;
