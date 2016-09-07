var express = require('express');
var router = express.Router();
var SurveyModel = require('../../../models/surveymodel');

router.get('/', function(req, res) {
    SurveyModel.fetchAll().then(function(surveys) {
	res.json(surveys)
    }).catch(function(err) {
	console.log(err);
	res.status(500).json({valid: false, error: err.message || err});
    });
});

module.exports = router;
