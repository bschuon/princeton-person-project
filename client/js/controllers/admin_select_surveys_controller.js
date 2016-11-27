app.controller('AdminSelectSurveysController', [
  "$scope",
  "$state",
  "AdminService",
  "$location",
  "LocalAuthService",
  function($scope, $state, AdminService, $location, LocalAuthService) {

    $scope.view = {selected: []};

    AdminService.surveys.all().then(function(response) {
      $scope.view.surveys = response.surveys;
    });

    $scope.toggleSurvey = function(id) {
      var index = $scope.view.selected.indexOf(id);
      if (index >= 0) {
	$scope.view.selected.splice(index, 1);
      } else {
	$scope.view.selected.push(id);
      }
    };

    $scope.selectSurveys = function() {
      var url = '/admin/csv-surveys/download';
      $location.path(url).search("id", $scope.view.selected);
    };
  }
]);
