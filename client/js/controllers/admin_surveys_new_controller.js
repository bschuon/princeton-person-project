app.controller('AdminSurveysNewController', [
  "$scope",
  "$rootScope",
  "$state",
  "AdminSurveysService",
  function($scope, $rootScope, $state, AdminSurveysService) {
    $rootScope.errors = [];
    $scope.survey = {
      name: ""
    };

    $scope.createSurvey = function(survey) {
      // alert('submitted survey: ' + JSON.stringify(survey));
      $rootScope.errors = [];
      AdminSurveysService.createSurvey(survey).then(function(data) {
	console.dir(data);
	if (data.valid) {
	  console.log('navigating to admin.surveys.show with id', data.model.id);
	  $state.go('admin.surveys.show', {id: data.model.id});
	} else {
	  $rootScope.errors.push(data.error);
	}
      });
    };
  }
]);
