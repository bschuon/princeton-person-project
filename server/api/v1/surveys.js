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
      pages: [
	{
	  "id": "16062797c1e9a92a9dbaae5e9ce17d6c",
	  "number": 1,
	  "name": null,
	  "description": null,
	  "pageFlow": {
            "nextPage": true,
            "label": "mwForm.pageFlow.goToNextPage"
	  },
	  "elements": [
            {
              "id": "e30d62038bb2becbe76cb144dc37472e",
              "orderNo": 1,
              "type": "question",
              "question": {
		"id": "e2473fd90ef36ab5bae5f0a33cf01ea3",
		"text": "Enter a number 0-100",
		"type": "number",
		"required": true,
		"pageFlowModifier": false,
		"min": 0,
		"max": 100
              }
            }
	  ],
	  "namedPage": false,
	  "isFirst": true,
	  "isLast": true
	}
      ]
    };
    res.json({
      valid: true,
      model: survey
    });
  }).catch(function(err) {
    console.log(err);
    res.status(500).json({
      valid: false,
      error: err.message || err
    });
  });
});

// update survey model
router.post('/:id', function(req, res) {
  var id = req.params.id;
  var version_id = req.body.version_id;
  var estimated_time = req.body.estimated_time;
  var survey = req.body.survey;
  new Survey({
    id: id,
    version_id: version_id,
    estimated_time: estimated_time,
    survey: survey
  }).save().then(function(model) {
    res.json({
      valid: true,
      model: model
    });
  }).catch(function(err) {
    console.log(err);
    res.status(500).json({valid: false, error: err.message || err});
  });
});

// create survey model
router.post('/', function(req, res) {
  var version_id = 1;
  var estimated_time = req.body.estimated_time;
  var survey = req.body.survey;
  new Survey({
    version_id: version_id,
    estimated_time: estimated_time,
    survey: survey
  }).save().then(function(model) {
    res.json({
      valid: true,
      model: model
    });
  }).catch(function(err) {
    console.log(err);
    res.status(500).json({valid: false, error: err.message || err});
  });
});

module.exports = router;
