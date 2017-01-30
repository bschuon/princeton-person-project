var express = require('express');
var router = express.Router();
var Survey = require('../../../models/survey');
var Response = require('../../../models/response');
var h = require('../helpers');
var MemoryStream = require('memorystream');
var path = require('path');
var _ = require('lodash');

router.get('/', function(req, res) {
  console.log('q:', req.query.q);
  Response.fetchAll({
    withRelated: ['survey', 'user']
  }).then(h.returnCollection(res)).catch(h.handleError(res));
});

module.exports = router;
