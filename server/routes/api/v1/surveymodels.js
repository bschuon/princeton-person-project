var express = require('express');
var router = express.Router();
var SurveyModel = require('../../../models/surveymodel');

// fetch all survey models
router.get('/', function(req, res) {
    SurveyModel.fetchAll().then(res.json).catch(function(err) {
	console.log(err);
	res.status(500).json({valid: false, error: err.message || err});
    });
});

// fetch survey model
router.get('/:id', function(req, res) {
    var id = req.params.id;
    SurveyModel.fetch(id).then(res.json).catch(function(err) {
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
    new SurveyModel({
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
    new SurveyModel({
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
