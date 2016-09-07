var express = require('express');
var router = express.Router();
var SurveyResponse = require('../../../models/surveyresponse');


router.post('/', function(req, res) {
    var version_id = req.body.response.version_id;
    var user_id = req.session.passport.user || req.body.userToken;
    var recorded_time = req.body.response.recorded_time; // in seconds
    var response = req.body.response.data;
    new SurveyResponse({
	version: version_id,
	user_id: user_id,
	recorded_time: recorded_time,
	response: response
    }).save().then(function(model) {
	res.json({valid: true});
    }).catch(function(err) {
	console.log(err);
	res.status(500).json({valid: false, error: err.message || err});
    });
});

module.exports = router;
