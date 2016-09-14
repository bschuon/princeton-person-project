var express = require('express');
var router = express.Router();
var SurveyResponse = require('../../../models/surveyresponse');


// submit survey response
router.post('/', function(req, res) {
    var version_id = req.body.response.version_id;
    var user_id = req.session.passport.user || req.body.userToken;
    var recorded_time = req.body.response.recorded_time; // in seconds
    var response = req.body.response.response;
    new SurveyResponse({
	version: version_id,
	user_id: user_id,
	recorded_time: recorded_time,
	response: response
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

// fetch survey response
router.get('/:id', function(req, res) {
    var id = req.params.id;
    SurveyResponse.fetch(id).then(function(data) {
	res.json(data);
    }).catch(function(err) {
	console.log(err);
	res.status(500).json({valid: false, error: err.message || err});
    });
});

// list survey responses
router.get('/', function(req, res) {
    SurveyResponse.fetchAll().then(function(data) {
	res.json(data);
    }).catch(function(err) {
	console.log(err);
	res.status(500).json({valid: false, error: err.message || err});
    });
});

module.exports = router;
