app.controller('UserProfileController', [
  "$scope",
  "$state",
  "UsersService",
  function($scope, $state, UsersService) {
    $scope.change = function(profile) {
      UsersService.changeProfile(profile).then(function(){
	return UsersService.verifyLogin();
      }).then(function(){
	$state.go('user.dashboard');
      }).catch(function() {
	$scope.errorMessage = "Password is invalid";
      });
    };
  }
]);
