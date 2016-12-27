app.controller('AdminSurveysShowController', [
  "$scope",
  "$state",
  "AdminSurveysService",
  "survey",
  function($scope, $state, AdminSurveysService, survey) {
    $scope.survey = survey;

    $scope.showPublish = function() {
      if (survey.status == 'draft') {
	return true;
      }
      return false;
    };

    $scope.showEditSchema = function() {
      if (survey.status == 'draft') {
	return true;
      }
      return false;
    };

    $scope.publish = function() {
      AdminSurveysService.publish(survey.id).then(function() {
	$state.go('admin.surveys.index');
      });
    };
  }
]);
