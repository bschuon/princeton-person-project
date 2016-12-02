var app = angular.module('person-project', [
  'ui.router',
  'ui.bootstrap',
  'ngCookies',
  'angularModalService',
  'formly',
  'formlyBootstrap',
  'angularUtils.directives.dirPagination',
  'mwFormBuilder',
  'mwFormViewer',
  'mwFormUtils',
  'pascalprecht.translate'
]);

app.config([
  "$urlRouterProvider",
  "$locationProvider",
  "$httpProvider",
  function($urlRouterProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push("AuthInterceptor");
    $urlRouterProvider.otherwise('/');
  }
]);

app.run([
  "UsersService",
  "$rootScope",
  "LocalAuthService",
  "$location",
  "$anchorScroll",
  "$state",
  "$http",
  function(UsersService, $rootScope, LocalAuthService, $location, $anchorScroll, $state, $http) {
    UsersService.verifyLogin();
    LocalAuthService.setToken();

    $rootScope.rAuth = {
      isAuthenticated: function() {
	return LocalAuthService.isAuthenticated();
      }
    };
    $rootScope.CONFIG = CONFIG;
    $rootScope.createAdmin = function(admin) {
      $http.post('/api/v1/bootstrap', admin).then(function() {
	UsersService.signin({
	  username: admin.email,
	  password: admin.password
	}).then(function() {
	  window.location.href= "/";
	});
      });
    };
    $rootScope.goToElement = function(element) {
      if (!$state.is('home')) {
	// TODO: Get anchor scrolling to work as well.
	$state.go('home');
      }
      $location.hash(element);
      $anchorScroll();
    };

    $rootScope.rAuth.isAdmin = function() {
      return LocalAuthService.isAdmin();
    };

    $http.get('/api/v1/users/stats').then(function(response) {
      if (response.data.admins > 0) {
	LocalAuthService.setBootstrapped();
      }
    });
  }
]);
