var SurveyItem = require('../models/question');

module.exports = function(survey_items, return_promise) {
  var success_msg = "Survey items seeded.",
      failure_msg = "ERROR: Surveys items did not seed";

  if (!!return_promise) {
    return Promise.all(survey_items.map(function (item) {
      return new SurveyItem(item).save();
    }));
  } else {
    return Promise.all(survey_items.map(function (item) {
        return new SurveyItem(item).save();
    })).then(function() {
      console.log(success_msg);
      process.exit();
    }, function() {
      console.log(failure_msg);
      process.exit(1);
    });
  }

};
