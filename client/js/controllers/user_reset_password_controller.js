app.controller('UserResetPasswordController', [
  '$scope',
  '$state',
  'Flash',
  'UsersService',
  'token',
  'userId',
  function($scope, $state, Flash, UsersService, token, userId) {
    $scope.message = 'hello world!';
    $scope.hasToken = false;
    $scope.changeForm = {};
    $scope.resetForm = {};
    console.log('UserResetPasswordController token:', token, 'userId:', userId);
    if (!!token) {
      $scope.hasToken = true;
    }
    $scope.changePassword = function() {
      console.log('$scope.password:', $scope.changeForm.password, '$scope.passwordConfirmation', $scope.changeForm.passwordConfirmation);
      if ($scope.changeForm.password == $scope.changeForm.passwordConfirmation && !!$scope.changeForm.password) {
	console.log('$scope.changeForm.password', $scope.changeForm.password);
	UsersService.resetPasswordWithToken(userId, token, $scope.changeForm.password).then(function() {
	  Flash.create('success', 'Password updated, please log in.');
	  $state.go('user.signin');
	}).catch(function(err) {
	  Flash.create('warning', 'Unable to reset password: ' + err);
	});
      } else {
	Flash.create('warning', 'Password does not match password confirmation value.');
      }
    };
    $scope.resetPassword = function() {
      console.log('$scope.resetForm.emailOrUsername', $scope.resetForm.emailOrUsername);
      UsersService.resetPassword($scope.resetForm.emailOrUsername).then(function() {
	Flash.create('info', 'We sent an email to the address on file for that account with further instructions on resetting your password.');
	$state.go('user.signin');
      }).catch(function(err) {
	Flash.create('warning', 'Sorry, we are unable to find that account at this time.');
      });
    };
  }
]);
