var express = require('express');
var router = express.Router();
var multiline = require('multiline');
var auth = require('../../../../middleware/auth/index');
var bookshelf = require('../../../../config/connection');
var json2csv = require('json2csv');
var _ = require('lodash');
var Promise = require('bluebird');

var MAX_FEATURED_SURVEYS = 8;

function validateFeaturedOrder(data) {
  if (!_.isObject(data) || !_.isArray(data.featuredOrder) || !data.featuredOrder.length > 0) return false;
  var duplicates = {id: [], position: []};
  return data.featuredOrder.reduce(function(acc, item) {
    if (!_.isFinite(Number(item.id)) || !_.isFinite(Number(item.position))) {
      acc = false;
    } else if (Number(item.position) > MAX_FEATURED_SURVEYS ||
               Number(item.position) < 0) {
      acc = false;
    } else if (duplicates.id.indexOf(Number(item.id)) > -1 ||
               duplicates.position.indexOf(Number(item.position)) > -1) {
      acc = false;
    } else {
      duplicates.id.push(Number(item.id));
      duplicates.position.push(Number(item.position));
    }
    return acc;
  }, true);
}

function getQueryParamAsArray(req, param, options) {
  var vals = [];
  if (options && options.number && _.isArray(req.query[param])) {
    req.query[param].forEach(function(key) {
      if (_.isFinite(Number(key))) {
        vals.push(Number(key));
      }
    });
  } else if (_.isArray(req.query[param])) {
    vals = req.query[param];
  } else if (options && options.number && _.isFinite(Number(req.query[param]))) {
    vals.push(Number(req.query[param]));
  } else if (req.query[param]) {
    vals = [req.query[param]];
  }
  
  return vals;
}

router.get('/', auth.ensureLoggedIn, auth.ensureAdmin, function(req, res) {
  bookshelf.knex.select("surveys.id", "surveys.name")
                .count("*")
                .from("surveys")
                .innerJoin("completions", "surveys.id", "completions.survey_id")
                .groupBy("surveys.id")
                .then(function(data){
    return data;
  }).then(function(data) {
    bookshelf.knex.select("surveys.id", "surveys.name")
                  .from("surveys")
                  .leftOuterJoin("completions", "surveys.id", "completions.survey_id")
                  .where("completions.id", null)
                  .then(function(dataNoCompletions) {
      dataNoCompletions = dataNoCompletions.map(function(r) {
        r.count = 0;
        return r;
      });

      return res.json({surveys: data.concat(dataNoCompletions)});
    });
  });
});


router.post('/', auth.ensureLoggedIn, auth.ensureAdmin, function(req, res) {
  res.status(404).send({error: "Not yet implemented"});
});

router.get('/items', auth.ensureLoggedIn, auth.ensureAdmin, function(req, res) {
  var ids = [], obj = {surveys: []}, dataStorage = {}, query;
  ids = getQueryParamAsArray(req, 'id', {number: true});

  bookshelf.knex.select("surveys.id", "surveys.name", "questions.text", "questions.id as question_id")
                .from("surveys")
                .innerJoin("questions", "surveys.id", "questions.survey_id")
                .whereIn("surveys.id", ids)
                .then(function(data){
    data.forEach(function(r) {

      dataStorage[r.id] = dataStorage[r.id] || {};
      dataStorage[r.id].name = r.name;
      dataStorage[r.id].questions = dataStorage[r.id].questions || [];
      dataStorage[r.id].questions.push({text: r.text, id: r.question_id});
    })

    obj.surveys = Object.keys(dataStorage).map(function(key) {
      return {id: key,
              name: dataStorage[key].name,
              questions: dataStorage[key].questions
             };
    });

    return res.json(obj);
  });
});

router.post('/featured-order', auth.ensureLoggedIn, auth.ensureAdmin, function(req, res) {
  if (validateFeaturedOrder(req.body) === false) {
    return res.status(404).send({erorr: "Invalid input"});
  }

  bookshelf.knex.transaction(function(trx) {
    return bookshelf.knex("surveys")
            .transacting(trx)
            .update({is_featured: false, position: null})
            .then(function() {
              return Promise.map(req.body.featuredOrder, function(item) {
                return bookshelf.knex("surveys")
                        .transacting(trx)
                        .where('id', Number(item.id))
                        .update({is_featured: true, position: Number(item.position)});
              })
            });
  }).then(function(updates) {
    res.send({success: "order updated"});
  }).catch(function(error) {
    res.status(404).send({error: error, message: "Invalid input"});
  });
});

// Example query string:
// sid=7&q2=demo-q5&q7=lone-q19&q7=lone-q17&q7=lone-q16&q7=lone-q13&q7=lone-q12
router.get('/csv', auth.ensureLoggedIn, auth.ensureAdmin, function(req, res) {
  var ids = getQueryParamAsArray(req, 'sid', {number: true}),
      obj = {},
      questionToIdMap = {user_id: ""},
      include = req.query.include,
      qids;

  if (include !== 'first' && include !== 'last' && include !== 'all') {
    include = 'last';
  }
  if (include === 'all' && ids.length > 1 || ids.length === 0) {
    return res.status(400).json({error: "bad request"});
  }

  qids = _.flatten(ids.map(function(id) {
    return getQueryParamAsArray(req, 'q' + id);
  }));
  if (include === 'all' && ids.length === 1) {
    var builder = bookshelf.knex.select("completions.id as cid", "completions.user_id", "answers.value", "questions.text", "questions.id as qid", "completions.survey_id")
                .from("completions")
                .innerJoin("answers","completions.id","answers.completion_id")
                .innerJoin("questions", "questions.id", "answers.question_id")
                .where("completions.survey_id", ids[0])
                .where("completions.version_id", 1);
    if (qids.length > 0) {
      builder.whereIn("questions.id", qids);
    }
    builder.then(function(data) {
      data.forEach(function(r) {
        obj[r.user_id] = obj[r.user_id] || {};
        obj[r.user_id][r.cid] = obj[r.user_id][r.cid] || {};
        obj[r.user_id][r.cid].user_id = r.user_id;
        obj[r.user_id][r.cid][r.text] = r.value;
        if (questionToIdMap[r.text] === undefined) {
          questionToIdMap[r.text] = r.qid;
        }
      });
      obj = _.map(obj, function(value, key){
        return value;
      });
      var objs = [];
      obj.forEach(function(item) {
        for(cid in item) {
          objs.push(item[cid]);
        }
      });

      objs.unshift(questionToIdMap);
      var fs = require('fs');
      json2csv({data: objs, del: '\t', quotes: ''}, function(err, tsv){
        fs.writeFile('file.tsv', tsv, function(err) {
          res.download('file.tsv');
        });
      });
    });
  } else if (include === 'last' || include === 'first') {

    var query = multiline.stripIndent(function(){/*
      select comps.survey_id, comps.user_id, q.text, q.id, a.value
      from 
          (select distinct on (c.user_id, c.survey_id) c.id, c.survey_id,
                  c.version_id, c.user_id, c.created_at, c.updated_at
           from completions c order by c.user_id, c.survey_id, created_at
    */});

    if (include === 'last') query +=  " DESC";
    if (include === 'first') query += " ASC";
    query += multiline.stripIndent(function() {/*
      ) comps
      join answers a on comps.id=a.completion_id
      join questions q on q.id=a.question_id
      where
    */});

    query += " ("
    for (var i = 0; i < ids.length; i++) {
      query += " comps.survey_id=?"
      if (i+1 < ids.length) { query += " or";}
      else { query += ")"}
    }

    if (qids.length > 0) { query += " and ("; }
    for (i = 0; i < qids.length; i++) {
      query += "q.id=?";
      if (i+1 < qids.length)  { query += " or "; }
      if (i+1 === qids.length) { query += ")";}
    }

    bookshelf.knex.raw(query, ids.concat(qids)).then(function(data) {
      data.rows.forEach(function(r) {
        obj[r.user_id] = obj[r.user_id] || {};
        obj[r.user_id].user_id = r.user_id;
        obj[r.user_id][r.text] = r.value;
        if (questionToIdMap[r.text] === undefined) {
          questionToIdMap[r.text] = r.id;
        }
      });

      var objs = _.map(obj, function(value, key){
        return value;
      });

      objs.unshift(questionToIdMap);
      var fs = require('fs');
      json2csv({data: objs, del: '\t', quotes: ''}, function(err, tsv){
        fs.writeFile('file.tsv', tsv, function(err) {
          res.download('file.tsv');
        });
      });
    });
  }
});

module.exports = router;
