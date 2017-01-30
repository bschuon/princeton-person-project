app.controller('AdminUsersShowController', [
  "$scope",
  "user",
  function($scope, user) {
    $scope.user = user;
  }
]);

