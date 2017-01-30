var app = angular.module('person-project', [

  'ui.router',
  'ui.bootstrap',
  'ui.codemirror',
  'ngCookies',
  'angularModalService',
  'formly',
  'formlyBootstrap',
  'angularUtils.directives.dirPagination',
  'mwFormBuilder',
  'mwFormViewer',
  'mwFormUtils',
  'pascalprecht.translate',
  'ngFlash',
  'hljs'
]);

app.config([
  "$urlRouterProvider",
  "$locationProvider",
  "$httpProvider",
  "$translateProvider",
  "FlashProvider",  
  function($urlRouterProvider, $locationProvider, $httpProvider, $translateProvider, FlashProvider) {
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push("AuthInterceptor");
    $urlRouterProvider.otherwise('/');
    $translateProvider.useStaticFilesLoader({
      prefix: '../dist/i18n/',
      suffix: '/angular-surveys.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('sanitize');
    FlashProvider.setTimeout(10000);
    FlashProvider.setShowClose(true);
  }
]);

app.run([
  "UsersService",
  "$rootScope",
  "LocalAuthService",
  "$location",
  "$anchorScroll",
  "$state",
  "$stateParams",
  "$http",
  "$parse",
  function(UsersService, $rootScope, LocalAuthService, $location, $anchorScroll, $state, $stateParams, $http, $parse) {
    UsersService.verifyLogin();
    LocalAuthService.setToken();

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    
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

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      console.log(fromState.name, '->', toState.name);
    });

    $rootScope.surveyBuilderOptions = {
      questionTypes:  [
	'text',
	'textarea',
	'radio',
	'checkbox',
	'grid',
	'priority',
	// 'division',
	'number',
	'date',
	'time',
	'email',
	'range',
	'url',
	'script'
      ],
      elementTypes: [
	'question',
	// 'image',
	'paragraph'
      ]
    };
  }
]);
