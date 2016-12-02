app.controller('UsersController', [
  "$timeout",
  "$state",
  "$rootScope",
  "$scope",
  "UsersService",
  "$location",
  "LocalAuthService",
  "$stateParams",
  function($timeout, $state, $rootScope, $scope, UsersService,
	   $location, LocalAuthService, $stateParams) {

    $scope.view = {loginInfo: {}};

    $scope.$on('login', function(){
      $scope.username = LocalAuthService.username();
    });

    $scope.dashboard = function(){
      $state.go('user.dashboard', {user_id: LocalAuthService.userId()});
    };

    $scope.signup = function() {
      UsersService.create($scope.newUser).then(function(response) {
	if (response.error) {
	  $scope.errors = response.error;
	  $scope.newUser = {};
	  $location.path('/signup');
	} else {
	  UsersService.migrate().then(function(response){
	    if(response.demographics){
	      LocalAuthService.setCompletedDemographics();
	    }

	    $state.go('home');
	  });
	}
      });
    };

    $scope.signin = function () {
      UsersService.signin($scope.view.loginInfo).then(function(response) {
	if(LocalAuthService.isAuthenticated()){
	  $scope.view.loginInfo = {};
	  if(LocalAuthService.isAdmin()){
	    $location.path('/admin/surveys');
	  } else {
	    $state.go('home');
	  }
	} else {
	  throw new Error("Login Failed");
	}
      }).catch(function(error) {
	LocalAuthService.clearCredentials();
	$scope.view.loginInfo.password = "";
	$scope.errors = error.statusText || error.message || "Login Failed";
      });
    };

    $scope.show = function(user) {
      UsersService.find(user).then(function(response) {
	$location.path('admin/users');
      });
    };

    $scope.delete = function(user) {
      var success_url = 'admin/users';
      var fail_url = 'admin/users';
      UsersService.destroy(user).then(function(response) {
	return response ? $location.path(success_url) : $location.path(fail_url);
      });
    };
  }
]);
