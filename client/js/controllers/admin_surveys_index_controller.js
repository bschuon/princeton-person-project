app.controller('AdminSurveysIndexController', [
  "$scope",
  "surveys",
  function($scope, surveys) {
    $scope.noSurveys = surveys.length == 0;
    $scope.surveys = surveys;
  }
]);

