app.controller('AdminUsersEditController', [
  "$scope",
  "$state",
  "Flash",
  "AdminUsersService",
  "user",
  function($scope, $state, Flash, AdminUsersService, user) {
    $scope.user = user;

    $scope.updateUser = function(user) {
      AdminUsersService.updateUser(user).then(function(model) {
	Flash.create('success', 'User updated!');
	$state.go('admin.users.show', {id: model.id});
      }).catch(function(err) {
	Flash.create('danger', err);
      });
    };
  }
]);
