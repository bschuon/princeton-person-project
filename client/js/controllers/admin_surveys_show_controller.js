app.controller('AdminSurveysShowController', [
  "$scope",
  "survey",
  function($scope, survey) {
    console.log('scope.survey = ', JSON.stringify(survey));
    $scope.survey = survey;
  }
]);
