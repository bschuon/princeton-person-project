app.controller('ResultsController', [
  "$scope",
  "$state",
  "LocalAuthService",
  "UsersService",
  function($scope, $state, LocalAuthService, UsersService) {
    $scope.signup = function(){
      $state.go('signup');
    };

    $scope.isAnon = !LocalAuthService.isAuthenticated();
    UsersService.result($state.params.completion_id).then(function(result){
      if (result.survey === "Not Implemented"){
	$state.go('user.dashboard');
      } else {
	$scope.result = result;
      }
    });
  }
]);
