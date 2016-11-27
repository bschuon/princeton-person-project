app.controller('UserPasswordController', [
  "$scope",
  "$state",
  "UsersService",
  function ($scope, $state, UsersService) {
    $scope.change = function(password, new_password){
      UsersService.changePassword(password, new_password).then(function(){
	$state.go('user.dashboard');
      }).catch(function() {
	$scope.errorMessage = "Old password is invalid";
      });
    };
  }
]);
