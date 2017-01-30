app.controller('AdminResponsesIndexController', [
  "$scope",
  "$state",
  "responses",
  function($scope, $state, responses) {
    $scope.responsesPresent = responses && responses.length > 0;
    $scope.responses = responses || [];
  }
]);

