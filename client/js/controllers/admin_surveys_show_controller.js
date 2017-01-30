/*global saveAs*/
app.controller('AdminSurveysShowController', [
  "$scope",
  "$state",
  "Flash",
  "AdminSurveysService",
  "survey",
  function($scope, $state, Flash, AdminSurveysService, survey) {
    $scope.survey = survey;

    $scope.showPublish = function() {
      return survey.status == 'draft' || survey.status == 'disabled';
    };

    $scope.showUnpublish = function() {
      return survey.status == 'published';
    };

    $scope.showDisable = function() {
      return survey.status == 'published';
    };

    $scope.download = function() {
      var data = JSON.stringify(survey, null, ' ');
      var file = new Blob([data], {
	type: 'application/json'
      });
      saveAs(file, `survey ${survey.name} v${survey.version}.json`);
    };

    $scope.publish = function() {
      AdminSurveysService.publishSurvey(survey.id).then(function() {
	$state.reload();
      }).catch(function(err) {
	Flash.create('warning', err);
      });
    };

    $scope.unpublish = function() {
      AdminSurveysService.unpublishSurvey(survey.id).then(function() {
	$state.reload();
      }).catch(function(err) {
	Flash.create('warning', err);
      });
    };

    $scope.disable = function() {
      AdminSurveysService.disableSurvey(survey.id).then(function() {
	$state.reload()
      }).catch(function(err) {
	Flash.create('warning', err);
      });
    };

  }
]);
