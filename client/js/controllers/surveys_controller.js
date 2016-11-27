app.controller('SurveysController', [
  "$scope",
  "$state",
  "SurveysService",
  "SurveyItemsService",
  "ModalService",
  "$location",
  "LocalAuthService",
  function($scope, $state, SurveysService, SurveyItemsService, ModalService, $location, LocalAuthService) {
    var surveyPromise;

    if ($state.current.name === "surveys") {
      surveyPromise = SurveysService.all();
    } else {
      surveyPromise = SurveysService.featured();
    }
    surveyPromise.then(function (response) {
      $scope.surveys = SurveyItemsService.shuffle(response);
    });

    $scope.userId = function() {
      return LocalAuthService.userId();
    };

    $scope.newSurvey = function () {
      $state.go('admin.new_survey');
    };
  }
]);
