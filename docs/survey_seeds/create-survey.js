if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({path: '.env'});
}

var Promise = require('bluebird');
var Survey = require('../../../models/survey');
var Version = require('../../../models/version');
var Question = require('../../../models/question');
var Field = require('../../../models/field');

var sid;

function createSurvey(data){
  new Survey(data.survey).save().then(function(model){
    sid = model.id;
    data.version.survey_id = sid;
    return new Version(data.version).save();
  }).then(function(model){
    return Promise.all(data.questions.map(function(q){
      q.survey_id = sid;
      return new Question(q).save(null, {method: 'insert'}).then(function(m){
        return m.versions().attach(model.attributes.version);
      });
    }));
  }).then(function(model){
    return Promise.all(data.fields.map(function(f){
      f.survey_id = sid;
      return new Field(f).save(null, {method: 'insert'});
    }));
  }).then(function(model){
    return Promise.all(data.mappings.map(function(mapping){
      return new Question({'id': mapping.qid}).fetch().then(function(question){
        return question.fields().attach(mapping.fid);
      });
    }));
  }).then(function(model){
    console.log('finished');
    process.exit();
  });
}

module.exports = createSurvey;
