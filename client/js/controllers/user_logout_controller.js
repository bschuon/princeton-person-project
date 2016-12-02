app.controller("UserLogoutController", [
  "$state",
  "UsersService",
  function($state, UsersService) {
    UsersService.logout().finally(function() {
      $state.go('home');
    });
  }
]);
