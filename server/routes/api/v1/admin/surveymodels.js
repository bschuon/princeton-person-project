var express = require('express');
var router = express.Router();
var SurveyModel = require('../../../../models/surveymodel');


router.post('/', function(req, res) {
    var version_id = req.body.version_id;
    var estimated_time = req.body.estimated_time; // in seconds
    var survey = req.body.survey;
    new SurveyModel({
	version_id: version_id,
	estimated_time: estimated_time,
	survey: survey || "{}"
    }).save().then(function(model) {
	res.json({
	    valid: true,
	    id: model.id
	});
    }).catch(function(err) {
	console.log(err);
	res.status(500).json({valid: false, error: err.message || err});
    });
});

module.exports = router;