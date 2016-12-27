app.controller('SurveysAvailableController', [
  '$scope',
  'surveys',
  function($scope, surveys) {
    $scope.surveys = surveys;
    $scope.noSurveys = surveys.length == 0;
  }
]);
