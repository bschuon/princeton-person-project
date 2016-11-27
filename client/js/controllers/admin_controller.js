app.controller('AdminController', [
  "$scope",
  "UsersService",
  "ModalService",
  function ($scope, UsersService, ModalService) {
    $scope.admin = {};
    $scope.users = [];

    UsersService.getAdmins().then(function (users) {
      $scope.users = users;
    });

    $scope.deleteAdmin = function(userId) {
      ModalService.showModal({
	templateUrl: "/partials/admin/delete_admin_modal.html",
	controller: "ModalController"
      }).then(function(modal) {
	modal.element.modal();
	modal.close.then(function(result) {
	  if (result === "DELETE") {
	    UsersService.deleteAdmin(userId).then(function() {
	      $scope.users = $scope.users.filter(function(user) {
		return user.id !== userId;
	      });
	    });
	  }
	});
      });
    };

    $scope.createAdmin = function () {
      UsersService.createAdmin($scope.admin).then(function (response) {
	if(response.error){
	  $scope.admin = {};
	  $scope.errors = response.error;
	} else {
	  $scope.admin = {};
	  $scope.users.push(response)
	}
      });
    };
  }
]);

