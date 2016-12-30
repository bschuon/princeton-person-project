app.controller('AdminSurveysScoringController', [
  '$scope',
  '$state',
  'Flash',
  'mwFormResponseUtils',
  'AdminSurveysService',
  'survey',
  function($scope, $state, Flash, mwFormResponseUtils, AdminSurveysService, survey) {
    survey.scoring = survey.scoring || {};
    survey.scoring.axes = survey.scoring.axes || [];

    $scope.editorOptions = {
      lineWrapping : true,
      lineNumbers: true,
      theme: 'twilight',
      mode: {name: "javascript", json: true}
    };
    
    $scope.devQuestions = mwFormResponseUtils.getQuestionList(survey.schema);

    $scope.questionScriptReference = function(question) {
      if (question.type == 'radio' ||
	  question.type == 'select' ||
	  question.type == 'checkbox') {
	var ref = _.map(question.weights, function(q) {
	  return {
	    id: q.id,
	    label: q.label
	  };
	});
	return JSON.stringify(ref, null, 4);
      } else if (question.type == 'number') {
	return "// n/a";
      } else {
	return JSON.stringify({
	  error: "not implemented: " + question.type
	}, null, ' ');
      }
    };

    $scope.questionScriptExample = function(question) {
      if (question.type == 'radio' ||
	  question.type == 'select') {
	var id = question.weights[0].id;
	var label = question.weights[0].label;
	return `function(responseId) {
  // ${label}
  if (responseId == "${id}") { 
    return 1;
  }
  return 0;
}`;
      } else if (question.type == 'checkbox') {
	var id = question.weights[0].id;
	var label = question.weights[0].label;
	return `function(selectedAnswers) {
  var totalScore = 0.0;
  _.each(selectedAnswers, function(answer) {
    // ${label}
    if (answer.id == "${id}") {
      totalScore = totalScore + 1;
    }
  }
  return totalScore;
}`;
      } else if (question.type == 'number' ||
		question.type == 'range') {
	return `function(response) {
  if (response < 2) {
    return 0;
  }
  return 1;
}`;
      } else {
	return JSON.stringify({
	  error: "questionScriptExample() not implemented: " + question.type
	}, null, ' ');
      }
    };

    $scope.changeScoreType = function(question, axis) {
      console.dir({
	question: question,
	axis: axis
      });
    };

    var seedQuestions = function() {
      var questions = mwFormResponseUtils.getQuestionList(survey.schema);
      return _.reduce(questions, function(memo, question) {
	if (question.type == "grid") {
	  _.each(question.grid.rows, function(row, index) {
	    memo.push({
	      id: row.id,
	      text: question.text + ' -> ' + row.label,
	      type: 'grid',
	      weights: _.map(question.grid.cols, function(col) {
		return {
		  id: col.id,
		  label: col.label,
		  axisScore: 0.0
		};
	      })
	    });
	  });
	} else if (question.type == "radio" ||
		   question.type == "checkbox" ||
		   question.type == "select") {
	  var weights = _.map(question.offeredAnswers, function(answer) {
	    return {
	      id: answer.id,
	      label: answer.value,
	      axisScore: 0.0
	    };
	  });
	  memo.push({
	    id: question.id,
	    text: question.text,
	    type: question.type,
	    weights: weights
	  });
	} else if (question.type == "number" ||
		  question.type == "range") {
	  memo.push({
	    id: question.id,
	    text: question.text,
	    type: question.type,
	    min: question.min,
	    max: question.max
	  });
	} else {
	  alert('not implemented: ' + question.type);
	}
	return memo;
      }, []);

    };
    
    $scope.survey = survey;

    $scope.addAxis = function() {
      survey.scoring.axes.push({
	name: "New Axis",
	questions: []
      });
    };

    $scope.updateScoring = function() {
      AdminSurveysService.updateSurveyScoring($scope.survey).then(function() {
	$state.reload();
      }).catch(function(err) {
	Flash.create('warning', err);
      });
    };

    $scope.allQuestions = seedQuestions();

    $scope.availableQuestions = function(idx) {
      return _.reject($scope.allQuestions, function(question) {
	return _.find($scope.survey.scoring.axes[idx].questions, function(axisQuestion) {
	  return axisQuestion.id == question.id;
	});
      });
    };

    $scope.removeAxis = function(idx) {
      $scope.survey.scoring.axes.splice(idx, 1);
    };

    $scope.addQuestion = function(axisIndex, questionId) {
      var question = _.findWhere($scope.allQuestions, {
	id: questionId
      });
      // we have to deep copy question to avoid the reference
      $scope.survey.scoring.axes[axisIndex].questions.push(JSON.parse(JSON.stringify((question))));
    };

  }
]);
