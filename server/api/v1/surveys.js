var express = require('express');
var router = express.Router();
var Survey = require('../../models/survey');
var h = require('./helpers');

router.get('/available', function(req, res) {
  Survey.where({
    status: 'published'
  }).fetch().then(h.returnCollection(res)).catch(h.handleError(res));
});

module.exports = router;
