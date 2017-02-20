app.controller('UserProfileController', [
  "$scope",
  "$state",
  "UsersService",
  function($scope, $state, UsersService) {
    
    $scope.update = function(profile) {
      UsersService.changeProfile(profile).then(function(){
	return UsersService.verifyLogin();
      }).then(function(){
	$state.go('user.dashboard');
      }).catch(function(err) {
	// $scope.errorMessage = "Password is invalid";
	$scope.errorMessage = "Error: " + (err.message || err);
      });
    };

  }
]);
