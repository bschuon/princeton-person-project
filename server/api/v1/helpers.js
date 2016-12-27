var express = require('express');
var router = express.Router();
var Survey = require('../../models/survey');

var helpers = {
  handleError: function(res) {
    return function(err) {
      console.log(err);
      res.json({
	valid: false,
	error: err.message || err
      });
    };
  },
  returnModel: function(res) {
    return function(model) {
      res.json({
	valid: true,
	model: model
      });
    };
  },
  returnCollection: function(res) {
    return function(collection) {
      res.json({
	valid: true,
	collection: collection
      });
    };
  },
  fetchSurvey: function(id) {
    return Survey.where({
      id: parseInt(id, 10)
    }).fetch();
  },
  optimisticLock: function(req) {
    return function(model) {
      if (model.attributes.version != req.body.version) {
	throw 'optimistic locking error';
      }
      return model;
    };
  }

};

module.exports = helpers;
