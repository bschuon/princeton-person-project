app.controller('SurveyResponseResultsController', [
  '$scope',
  'survey',
  'response',
  function($scope, survey, response) {
    $scope.survey = survey;
    $scope.response = response;
  }
]);
