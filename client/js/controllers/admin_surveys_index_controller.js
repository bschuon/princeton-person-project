app.controller('AdminSurveysIndexController', [
  "$scope",
  "$state",
  "surveys",
  function($scope, $state, surveys) {
    $scope.noSurveys = !surveys;
    $scope.surveys = surveys;
    $scope.navSurvey = function(id) {
      $state.go('admin.surveys.show', {id: id});
    };
  }
]);

