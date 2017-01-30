app.controller('AdminUsersNewController', [
  "$scope",
  "$state",
  "Flash",
  "AdminUsersService",
  function($scope, $state, Flash, AdminUsersService) {
    $scope.user = {};

    $scope.createUser = function(user) {
      AdminUsersService.createUser(user).then(function(model) {
	Flash.create('success', 'User created!');
	$state.go('admin.users.show', {id: model.id});
      }).catch(function(err) {
	Flash.create('danger', err);
      });
    };
  }
]);
