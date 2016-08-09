var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var multiline = require('multiline');
var _ = require('lodash');
var Survey = require('../../../models/survey');
var Version = require('../../../models/version');
var Question = require('../../../models/question');
var Field = require('../../../models/field');
var Completion = require('../../../models/completion');
var Answer = require('../../../models/answer');
var Score = require('../../../models/score');
var User = require('../../../models/user');
var bookshelf = require('../../../config/connection');
var auth = require('../../../middleware/auth/index');
var algorithmRunner = require('../../../lib/algorithm-runner');

/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */

router.post('/', function(req, res){
  var survey_id =  req.body.survey.survey_id;
  var version_id = req.body.survey.version_id;
  var user_id = req.session.passport.user || req.body.userToken;

  if(req.body.survey.name === 'Demographics' && !isNaN(user_id)){
    new User({id: user_id, completed_demographics: true}).save().then(saveCompletion);
  }else{
    saveCompletion();
  }

  function saveCompletion(){
    var completion_id;

    // Completion
    new Completion({recorded_time: req.body.recordedTime, survey_id: survey_id, version_id: version_id, user_id: user_id}).save()
    .then(function(model){
      completion_id = model.id;
      // Answers
      return Promise.all(_.map(req.body.answers, function(value, key){
        return new Answer({completion_id: model.id, question_id: key, value: value}).save();
      }));
    }).then(function(model){
      // Scores
      if(req.body.survey.algorithm){
        try {
          var algorithm = JSON.parse(req.body.survey.algorithm);
        } catch (reason) {
          return Promise.reject("Unable to parse algorithm JSON:\n" + reason.message);
        }
        var answers = req.body.answers;
        var score = algorithmRunner(algorithm, answers);
        return new Score({completion_id: completion_id, value: score}).save();
      }
    })
    .then(function () {
      res.json({valid: true});
    })
    .catch(function(err) {
      console.log(err)
      res.status(500).json({valid: false, error: err.message || err});
    });
  }
});

/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */

router.get('/:id', function (req, res){
  var query = multiline.stripIndent(function(){/*
    select q.id as q_id, q.group_number as q_group_number, q.group_type as q_group_type,
      q.group_title as q_group_title, q.text as q_text, q.position as q_position,
      q.dependent_id as q_dependent_id, q.dependent_value as q_dependent_value, q.master_id as q_master_id,
      f.id as f_id, f.value as f_value, f.position as f_position,
      f.text as f_text, f.widget as f_widget, qv.version_id, s.id as s_id, s.name as s_name,
      v.status, v.algorithm
    from fields f
    inner join fields_questions fq on f.id = fq.field_id
    inner join questions q on q.id = fq.question_id
    inner join questions_versions qv on qv.question_id = q.id
    inner join surveys s on s.id = q.survey_id
    inner join versions v on v.survey_id = s.id
    where fq.question_id in
      (select q.id
      from questions q
      inner join questions_versions qv on q.id = qv.question_id
      where q.survey_id = ? and qv.version_id =
        (select version from versions where survey_id = ? order by version desc limit 1));
  */});

  bookshelf.knex.raw(query, [req.params.id, req.params.id]).then(function(data){
    var obj = {};
    var group;

    obj.name = data.rows[0].s_name;
    obj.survey_id = data.rows[0].s_id;
    obj.version_id = data.rows[0].version_id;
    obj.status = data.rows[0].status;
    obj.algorithm = data.rows[0].algorithm;
    obj.groups = [];

    _.shuffle(data.rows).forEach(function(r){
      var group = _.find(obj.groups, function(g){
        return g.number === r.q_group_number;
      });

      if(!group){
        group = {};
        group.number = r.q_group_number;
        group.type = r.q_group_type;
        group.title = r.q_group_title;
        group.master_id = r.q_master_id;
        group.dependent_id = r.q_dependent_id;
        group.dependent_value = r.q_dependent_value;
        group.show = r.q_dependent_id === null;

        group.questions = [];
        obj.groups.push(group);
      }

      var question = _.find(group.questions, function(q){
        return q.data.question_id === r.q_id;
      });

      if(!question){
        question = {};
        question.fields = [];
        question.data = {};
        question.data.question_id = r.q_id;
        question.data.text = r.q_text;
        question.data.position = r.q_position;
        group.questions.push(question);
      }

      question.fields.push({field_id: r.f_id, value: r.f_value, position: r.f_position, text: r.f_text, widget: r.f_widget});
    });

    var tmp = obj.groups;
    obj.groups = [];

    tmp.forEach(function(g){
      if(g.show){
        obj.groups.push(g);
      }
    });

    tmp.forEach(function(g){
      if(!g.show){
        var index = _.findIndex(obj.groups, function(t){ return t.master_id === g.dependent_id; });
        obj.groups.splice(index + 1, 0, g);
      }
    });

    res.json(obj);
  }).catch(function(err) {
    res.status(500).json({error: err});
  });
});

/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */

module.exports = router;
