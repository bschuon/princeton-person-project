var express = require('express');
var router = express.Router();
var Survey = require('../../models/survey');

// fetch all survey models
router.get('/', function(req, res) {
  Survey.fetchAll().then(function(data) {
    res.json(data); // TODO: transform data.attributes
  }).catch(function(err) {
    console.log(err);
    res.status(500).json({valid: false, error: err.message || err});
  });
});

// fetch survey model
router.get('/:id', function(req, res) {
  var id = req.params.id;
  new Survey({id: id}).fetch().then(function(data) {
    var survey = data.attributes;
    survey.schema = survey.schema || {
      name: "todo name",
      description: "todo description",
      pages: []
    };
    res.json({
      valid: true,
      model: survey
    });
  }).catch(function(err) {
    console.log(err);
    res.json({
      valid: false,
      error: err.message || err
    });
  });
});

// update survey model schema
router.post('/:id/schema', function(req, res) {
  Survey.where({
    id: parseInt(req.body.id, 10)
  }).fetch().then(function(model) {
    if (model.version !== req.body.version) {
      throw "optimistic locking error";
    }
    if (model.state !== 'draft') {
      model.version++;
    }
    model.schema = req.body.schema;
    model.save().then(function(model) {
      res.json({
	valid: true,
	model: model
      }).catch(function(err) {
	console.log(err);
	res.json({
	  valid: false,
	  error: err.message || err
	});
      });
    }).catch(function(err) {
      console.log(err);
      res.json({
	valid: false,
	error: err.message || err
      });
    });
  });
});

// create survey model
router.post('/', function(req, res) {
  new Survey({
    version: 1,
    estimated_time: parseInt(req.body.est_time, 10),
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
