var express = require('express');
var router = express.Router();
var SurveyModel = require('../../../../models/surveymodel');


router.post('/', function(req, res) {
    var version_id = req.body.response.version_id;
    var estimated_time = req.body.response.estimated_time; // in seconds
    var survey = req.body.response.survey;
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
