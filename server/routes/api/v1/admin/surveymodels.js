var express = require('express');
var router = express.Router();
var SurveyModel = require('../../../../models/surveymodel');


router.post('/', function(req, res) {
    var version_id = req.body.response.version_id;
    var estimated_time = req.body.response.estimated_time; // in seconds
    var response = req.body.response.data;
    new SurveyModel({
	version: version_id,
	estimated_time: estimated_time,
	survey: survey
    }).save().then(function(model) {
	res.json({valid: true});
    }).catch(function(err) {
	console.log(err);
	res.status(500).json({valid: false, error: err.message || err});
    });
});

module.exports = router;
