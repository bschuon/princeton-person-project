app.controller('SurveyResponseResultsController', [
  '$scope',
  'survey',
  'response',
  function($scope, survey, response) {
    var scoreAxisQuestion = function(axis, question) {
      if (question.type == 'grid') {
	var result = 0;
	_.each(question.response, function(resp) {
	  var axisQuestion = _.findWhere(axis.questions, { // TODO: maybe name axisQuestion something better?
	    id: resp.row.id
	  });
	  if (axisQuestion) {
	    var weight = _.findWhere(axisQuestion.weights, function(weight) {
	      return resp.col.id == weight.id;
	    });
	    if (weight) {
	      result = result + weight.axisScore;
	    }
	  }
	});
	return result;
      }
      alert('not implemented: ' + question.type);
      return 0;
    };
    var scoreAxis = function(axis, response) {
      var result = 0;
      _.each(response.question_with_response_list, function(question) {
	result = result + scoreAxisQuestion(axis, question);
      });
      return result;
    };
    var score = function(survey, response) {
      return _.map(survey.scoring.axes, function(axis) {
	return {
	  label: axis.name,
	  description: axis.description,
	  score: scoreAxis(axis, response)
	};
      });
    };
    $scope.survey = survey;
    $scope.response = response;
    $scope.score = score(survey, response);
  }
]);
