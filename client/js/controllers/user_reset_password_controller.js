app.controller('UserResetPasswordController', [
  '$scope',
  '$state',
  'UsersService',
  function($scope, $state, UsersService) {
    $scope.resetPassword = function() {
      UsersService.resetPassword($scope.emailOrUsername);
    };
  }
]);
