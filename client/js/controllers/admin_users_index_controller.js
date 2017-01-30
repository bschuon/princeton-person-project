app.controller('AdminUsersIndexController', [
  "$scope",
  "$state",
  "users",
  function($scope, $state, users) {
    $scope.users = users;
    $scope.navUser = function(id) {
      $state.go('admin.users.show', {id: id});
    };
  }
]);

