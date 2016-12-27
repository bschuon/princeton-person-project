var express = require('express');
var router = express.Router();
var Response = require('../../models/response');
var h = require('./helpers');

router.get('/:id', function(req, res) {
  h.fetchResponse(req.params.id).then(h.returnModel(res)).catch(h.handleError(res));
});

// submit survey response
router.post('/', function(req, res) {
  var params = {
    user_id: parseInt(req.user.id, 10),
    survey_id: parseInt(req.body.surveyId, 10),
    recorded_time: parseInt(req.body.recordedTime, 10),
    data: JSON.stringify(req.body.responseData),
    merged: JSON.stringify(req.body.merged),
    question_with_response_list: JSON.stringify(req.body.questionWithResponseList),
    response_sheet_row: JSON.stringify(req.body.responseSheetRow),
    response_sheet_header: JSON.stringify(req.body.responseSheetHeaders),
    response_sheet: JSON.stringify(req.body.responseSheet)
  };
  // console.log(JSON.stringify(params));
  Response.forge(params).save().then(h.returnModel(res)).catch(h.handleError(res));
});

module.exports = router;
