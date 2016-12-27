app.controller('AdminSurveysIndexController', [
  "$scope",
  "$state",
  "surveys",
  function($scope, $state, surveys) {
    console.log('surveys: ', JSON.stringify(surveys));
    $scope.noSurveys = surveys.length == 0;
    $scope.surveys = surveys;
    $scope.navSurvey = function(id) {
      $state.go('admin.surveys.show', {id: id});
    };
  }
]);

