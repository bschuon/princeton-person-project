app.controller('AdminSurveysNewController', [
  "$scope",
  "$state",
  "AdminSurveysService",
  "Flash",
  function($scope, $state, AdminSurveysService, Flash) {
    $scope.survey = {
      name: ""
    };

    $scope.createSurvey = function(survey) {
      AdminSurveysService.createSurvey(survey).then(function(model) {
	Flash.create('success', 'Survey created!');
	$state.go('admin.surveys.show', {id: model.id});
      }).catch(function(err) {
	Flash.create('danger', err);
      });
    };
  }
]);
