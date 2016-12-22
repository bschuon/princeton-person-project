app.controller('AdminUsersIndexController', [
  "$scope",
  "users",
  function($scope, users) {
    $scope.users = users;
  }
]);

