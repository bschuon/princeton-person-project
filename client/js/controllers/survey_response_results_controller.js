app.controller('SurveyResponseResultsController', [
  '$scope',
  'survey',
  'response',
  function($scope, survey, response) {
    var scoreByScript = function(script, arg) {
      var f = function() {alert("unable to parse script: " + script); return 0;};
      try {
	eval("f = " + script);
      } catch(e) {
	alert(e);
      }
      return f(arg);
    };
    
    var scoreByWeight = function(axisQuestion, question) {
      var weight = _.findWhere(axisQuestion.weights, function(weight) {
	return weight.id == question.response.selectedAnswer.id;
      });
      if (weight) {
	return weight.axisScore;
      }
      return 0.0;
    };

    var scoreByGridWeight = function(axisQuestion, resp) {
      var weight = _.findWhere(axisQuestion.weights, function(weight) {
	return resp.col.id == weight.id;
      });
      if (weight) {
	return weight.axisScore;
      }
      return 0.0;
    };

    var scoreByCBWeights = function(axisQuesiton, question) {
      var result = 0;
      _.each(question.response.selectedAnswers, function(answer) {
	var weight = _.findWhere(axisQuestion.weights, {
	  id: answer.id
	});
	if (weight) {
	  result = result + weight.axisScore;
	}
      });
      return result;
    };
    
    var scoreAxisQuestion = function(axis, question) {
      var result = 0.0;
      var axisQuestion = null;
      if (question.type == 'grid') {
	_.each(question.response, function(resp) {
	  axisQuestion = _.findWhere(axis.questions, { // TODO: maybe name axisQuestion something better?
	    id: resp.row.id
	  });
	  if (axisQuestion) {
	    if (axisQuestion.scoreType == 'weights') {
	      result = result + scoreByGridWeight(axisQuestion, resp);
	    } else {
	      alert(question.type + 'unknown score type: ' + axisQuestion.scoreType);
	    }
	  }
	});
      } else if (question.type == 'radio' ||
		 question.type == 'select') {
	axisQuestion = _.findWhere(axis.questions, {
	  id: question.id
	});
	if (axisQuestion) {
	  if (axisQuestion.scoreType == 'weights') {
	    result = result + scorebyWeight(axisQuestion, question);
	  } else if (axisQuestion.scoreType == 'script') {
	    result = result + scoreByScript(axisQuestion.script, question.response.selectedAnswer.id);
	  } else {
	    alert(question.type + 'unknown score type: ' + axisQuestion.scoreType);
	  }
	}
      } else if (question.type == 'checkbox') {
	axisQuestion = _.findWhere(axis.questions, {
	  id : question.id
	});
	if (axisQuestion) {
	  if (axisQuestion.scoreType == 'weights') {
	    result = result + scoreByCBWeights();
	  } else if (axisQuestion.scoreType == 'script') {
	    result = result + scoreByScript(axisQuestion.script, question.response.selectedAnswers);	    
	  } else {
	    alert(question.type + 'unknown score type: ' + axisQuestion.scoreType);
	  }
	}
      } else if (question.type == 'number' ||
		 question.type == 'range') {
	axisQuestion = _.findWhere(axis.questions, {
	  id : question.id
	});
	if (axisQuestion) {
	  if (axisQuestion.scoreType == 'script') {
	    result = result + scoreByScript(axisQuestion.script, question.response);	    
	  } else {
	    alert(question.type + 'unknown score type: ' + axisQuestion.scoreType);
	  }
	}
      } else {
	alert('not implemented: ' + question.type);
      }
      return result;
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
