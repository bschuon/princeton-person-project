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

        var seedQuestions = function() {
      var questions = mwFormResponseUtils.getQuestionList(survey.schema);
      return _.reduce(questions, function(memo, question) {
	if (question.type == "grid") {
	  _.each(question.grid.rows, function(row, index) {
	    memo.push({
	      id: row.id,
	      text: row.label,
	      weights: [
		// TODO: response weights need to be populated
		// e.g. {id: "", text: "", axisValue: -1.5}
	      ] 
	    });
	  });
	} else {
	  memo.push({
	    id: question.id,
	    text: question.text,
	    weights: [
	      // TODO: response weights need to be populated
	      // e.g. {id: "", text: "", axisValue: -1.5}
	    ] 
	  });
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

    var allQuestions = seedQuestions();
    $scope.availableQuestions = function(idx) {
      return _.reject(allQuestions, function(question) {
	return _.find($scope.survey.scoring.axes[idx].questions, function(axisQuestion) {
	  return axisQuestion.id == question.id;
	});
      });
    };

    $scope.removeAxis = function(idx) {
      $scope.survey.scoring.axes.splice(idx, 1);
    };

    $scope.addQuestion = function(idx, elem) {
      alert('addQuestion(' + idx + ',' + elem + ') not implemented');
    };


  }
]);
