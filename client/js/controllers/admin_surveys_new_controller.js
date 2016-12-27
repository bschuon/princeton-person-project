app.controller('AdminSurveysNewController', [
  "$scope",
  "$state",
  "AdminSurveysService",
  function($scope, $state, AdminSurveysService) {
    $scope.survey = {
      name: ""
    };

    $scope.createSurvey = function(survey) {
      AdminSurveysService.createSurvey(survey).then(function(model) {
	$state.go('admin.surveys.show', {id: model.id});
      });
    };
  }
]);
