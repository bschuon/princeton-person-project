app.controller('UserDashboardController', [
  "$state",
  "$rootScope",
  "$scope",
  "UsersService",
  "$location",
  "LocalAuthService",
  "$stateParams",
  "ModalService",
  function($state, $rootScope, $scope, UsersService, $location,
	   LocalAuthService, $stateParams, ModalService) {

    $scope.email = LocalAuthService.email();
    $scope.username = LocalAuthService.username();

    $scope.destroyAfterConfirmation = function() {
      ModalService.showModal({
	templateUrl: "/partials/users/delete_user_modal.html",
	controller: "ModalController"
      }).then(function(modal) {
	modal.element.modal();
	modal.close.then(function(result) {
	  if (result === "DELETE") {
	    UsersService.destroy().then(function(data){
	      LocalAuthService.clearCredentials();
	      $state.go('home');
	    });
	  }
	});
      });
    };

    /*
    UsersService.completedSurveys().then(function(data){
      $scope.completions = data.rows;
    });
    */
  }
]);
