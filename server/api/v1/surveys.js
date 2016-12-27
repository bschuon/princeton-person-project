var express = require('express');
var router = express.Router();
var Survey = require('../../models/survey');
var h = require('./helpers');

router.get('/available', function(req, res) {
  Survey.where({
    status: 'published'
  }).fetchAll().then(h.returnCollection(res)).catch(h.handleError(res));
});

router.get('/:id', function(req, res) {
  h.fetchSurvey(req.params.id).then(h.returnModel(res)).catch(h.handleError(res));
});

module.exports = router;
