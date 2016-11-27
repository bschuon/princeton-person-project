app.controller("SurveyController", [
  "$rootScope",
  "$scope",
  "$stateParams",
  "$location",
  "$state",
  "ModalService",
  "SurveysService",
  "SurveyItemsService",
  "LocalAuthService",
  function($rootScope, $scope, $stateParams, $location, $state,
	    ModalService, SurveysService, SurveyItemsService, LocalAuthService) {
    if ($stateParams.survey_id) {
      SurveysService.find($stateParams.survey_id).then(function(response) {
	$rootScope.survey = $scope.survey = response;
      });
    }

    $scope.showConsentModal = function(survey) {
      SurveysService.requestSurvey(survey);
      ModalService.showModal({
	templateUrl: "/partials/users/consent.html",
	controller: "SurveyController"
      }).then(function(modal) {
	modal.element.modal();
	modal.close.then(function(result) {
	});
      });
    };

    $scope.submitConsentForm = function () {
      var survey = SurveysService.survey;
      if($scope.consent){
	$location.path('/users/surveys/' + survey.id);
      }
    };

    $scope.dismissModal = function(result) {
      close(result, 200);
      $location.path('/');
    };
    var vm = this;
    vm.survey = {};
  }
]);
