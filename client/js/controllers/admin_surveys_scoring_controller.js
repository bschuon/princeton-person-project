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
