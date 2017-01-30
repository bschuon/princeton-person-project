var express = require('express');
var router = express.Router();
var Survey = require('../../../models/survey');
var h = require('../helpers');
var MemoryStream = require('memorystream');
var path = require('path');
var _ = require('lodash');

router.get('/', function(req, res) {
  Survey.fetchAll().then(h.returnCollection(res)).catch(h.handleError(res));
});

router.get('/:id', function(req, res) {
  h.fetchSurvey(req.params.id).then(h.returnModel(res)).catch(h.handleError(res));
});

router.post('/', function(req, res) {
  new Survey({
    name: req.body.name,
    version: 0,
    status: 'draft',
    est_time: req.body.est_time, // in seconds
    schema: req.body.schema || "{}"
  }).save().then(h.returnModel(res)).catch(h.handleError(res));
});

// import
router.post('/import', function(req, res) {
  req.pipe(req.busboy);
  req.busboy.on('file', function(fieldname, file, filename) {
    var mstream = new MemoryStream(null, {
      readable: false
    });
    file.pipe(mstream);
    file.on('end', function() {
      var uploaded = JSON.parse(mstream.toString());
      h.fetchSurvey(uploaded.id).then(function(survey) {
	survey.attributes.version++;
	var attrs = _.omit(uploaded, ['id', 'version', 'created_at','updated_at']);
	return survey.save(attrs);
      }).catch(function() {
	var attrs = _.omit(uploaded, ['created_at','updated_at']);
	return Survey.forge().save(attrs);
      }).then(h.returnModel(res)).catch(h.handleError(res));
    });
  });
});

router.post('/:id', function(req, res) {
  // var id = parseInt(req.params.id);
  // TODO: handle version
  new Survey({
    version: parseInt(req.body.version),
    est_time: req.body.est_time,
    name: req.body.name,
    schema: req.body.schema
  }).save().then(h.returnModel(res)).catch(h.handleError(res));
});

router.post('/:id/publish', function(req, res) {
  h.fetchSurvey(req.params.id).then(function(survey) {
    if (survey.attributes.status != 'draft' &&
       survey.attributes.status != 'disabled') {
      throw 'state transition error';
    }
    survey.attributes.status = 'published';
    return survey.save();
  }).then(h.returnModel(res)).catch(h.handleError(res));
});

router.post('/:id/unpublish', function(req, res) {
  h.fetchSurvey(req.params.id).then(function(survey) {
    if (survey.attributes.status != 'published') {
      throw 'state transition error';
    }
    survey.attributes.status = 'draft';
    return survey.save();
  }).then(h.returnModel(res)).catch(h.handleError(res));
});

router.post('/:id/disable', function(req, res) {
  h.fetchSurvey(req.params.id).then(function(survey) {
    if (survey.attributes.status != 'published') {
      throw 'state transition error';
    }
    survey.attributes.status = 'disabled';
    return survey.save();
  }).then(h.returnModel(res)).catch(h.handleError(res));
});

router.post('/:id/schema', function(req, res) {
  h.fetchSurvey(req.params.id).then(h.optimisticLock(req)).then(function(survey) {
    survey.attributes.schema = JSON.stringify(req.body.schema);
    survey.attributes.version++;
    return survey.save();
  }).then(h.returnModel(res)).catch(h.handleError(res));
});

router.post('/:id/scoring', function(req, res) {
  h.fetchSurvey(req.params.id).then(h.optimisticLock(req)).then(function(survey) {
    survey.attributes.scoring = JSON.stringify(req.body.scoring);
    survey.attributes.version++;
    return survey.save();
  }).then(h.returnModel(res)).catch(h.handleError(res));
});

module.exports = router;
