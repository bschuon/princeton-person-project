app.controller('UserResendVerificationController', [
  "$scope",
  "$state",
  "UsersService",
  function($scope, $state, UsersService) {
    UsersService.resendVerificationToken().then(function() {
      // TODO: flash notice
    }).catch(function(err) {
      // TODO: flash notice
      $scope.error = "Unable to resend verification token: " + err;
    }).finally(function() {
      window.location.href = '/users/verification-sent';
    });
  }
]);
