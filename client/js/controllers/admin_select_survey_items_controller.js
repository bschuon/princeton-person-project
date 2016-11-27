app.controller('AdminSelectSurveyItemsController', [
  "$scope",
  "$state",
  "AdminService",
  "$location",
  "LocalAuthService",
  function($scope, $state, AdminService, $location, LocalAuthService) {
    $scope.view = {};
    $scope.view.options = [
      {value: "first", display: "Include first result for users"},
      {value: "last", display: "Include last result for user"},
    ];
    if ($location.search().id && $location.search().id.length === 1) {
      $scope.view.options.unshift({value: "all", display: "Include all user results"});
    }
    $scope.view.include = "";
    AdminService.surveys.items($location.search().id).then(function(data) {
      $scope.view.surveys = data.surveys;
      if ($scope.view.surveys && _.isArray($scope.view.surveys)) {
	$scope.view.surveys.forEach(function(survey) {
	  if (_.isArray(survey.questions)) {
	    survey.selectAll = false;
	    survey.questions.forEach(function(question) {
	      question.selected = false;
	    });
	  }
	});
      }
    });

    $scope.selectAll = function(survey) {
      if (survey.selectAll === true) {
	survey.questions.forEach(function(question) {
	  question.selected = true;
	});
      } else {
	survey.questions.forEach(function(question) {
	  question.selected = false;
	});
      }
    };

    $scope.createCSV = function() {
      var selected = {};
      $scope.view.surveys.forEach(function(survey) {
	survey.questions.forEach(function(question) {
	  if (question.selected === true) {
	    if (selected[survey.id] === undefined) {
	      selected[survey.id] = [];
	    }
	    selected[survey.id].push(question.id);
	  }
	});
      });
      AdminService.surveys.csv(selected, $scope.view.include);
    };
  }
]);
