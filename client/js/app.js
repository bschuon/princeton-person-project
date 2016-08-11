var app = angular.module('person-project', [
  'ui.router',
  'ngCookies',
  'angularModalService',
  'formly',
  'formlyBootstrap',
  'angularUtils.directives.dirPagination',
  'mwFormBuilder'
]);

app.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "$httpProvider",
  function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  $locationProvider.html5Mode(true);
  $httpProvider.interceptors.push("AuthInterceptor");
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {url: '/', templateUrl: '/partials/welcome/main.html', controller: 'SurveysController'})
  .state('terms', {url: '/terms', templateUrl: '/partials/welcome/terms.html', controller: 'UsersController'})
  .state('signup', {url: '/signup', templateUrl: '/partials/users/new.html', controller: 'UsersController'})
  .state('signin', {url: '/signin', templateUrl: '/partials/users/signin.html', controller: 'UsersController'})
  .state('surveys', {url: '/surveys', templateUrl: '/partials/surveys/index.html', controller: 'SurveysController'})
  .state('user', {url: '/users', templateUrl: '/partials/users/template.html', controller: 'UsersController'})
  .state('user.survey', {url: '/surveys/:survey_id', controller: 'SurveyController',
      views: {'' :                        {templateUrl: '/partials/surveys/show.html', controller: 'SurveyController'},
              'surveyItems@user.survey' : {templateUrl: 'partials/survey_items/show.html', controller: 'SurveyItemController as vm'}}})
  .state('user.results', {url: '/results', templateUrl: 'partials/users/results.html', controller: 'ResultsController',})
  .state('user.results_detail', {url: '/results/:completion_id', templateUrl: 'partials/users/results.html', controller: 'ResultsController',})
  .state('user.password', {url: '/password', templateUrl: 'partials/users/password.html', controller: 'UserPasswordController',})
  .state('user.profile', {url: '/profile', templateUrl: 'partials/users/profile.html', controller: 'UserProfileController',})
  .state('user.dashboard', {url: '/dashboard', templateUrl: 'partials/users/dashboard.html', controller: 'UserDashboardController',})
  .state('admin', {url: '/admin', templateUrl: '/partials/admin/dashboard.html', controller: 'AdminController'})
  .state('admin.manage', {url: '/manage', templateUrl: '/partials/admin/manage.html', controller: 'AdminController'})
  .state('admin.featured', {url: '/featured', templateUrl: '/partials/admin/featured.html', controller: 'FeaturedSurveysController'})
  .state('admin.select_surveys', {url: '/csv-surveys', templateUrl: 'partials/admin/select_surveys.html', controller: 'AdminSelectSurveysController'})
  .state('admin.select_survey_items', {url: '/csv-surveys/download', templateUrl: 'partials/admin/select_survey_items.html', controller: 'AdminSelectSurveyItemsController'})
  .state('admin.new_survey', {url: '/surveys/new', templateUrl: '/partials/surveys/new', controller: 'SurveyController as vm'})
  .state('admin.survey', {url: '/surveys/:survey_id', templateUrl: '/partials/surveys/show.html', controller: 'SurveyController'})
  .state('admin.surveys', {url: '/surveys', templateUrl: '/partials/admin/manage_surveys.html', controller: 'AdminSurveysController'})
  .state('admin.users', {url: '/users', templateUrl: '/partials/users/index.html', controller: 'UsersController'})
  .state('admin.user', {url: '/users/:user_id', templateUrl: '/partials/admin/show_user.html', controller: 'UsersController'})
}]);

app.run(["UsersService", "$rootScope", "LocalAuthService", "$location", "$anchorScroll", "$state",
  function(UsersService, $rootScope, LocalAuthService, $location, $anchorScroll, $state) {
  UsersService.verifyLogin();
  LocalAuthService.setToken();

  $rootScope.rAuth = {};
  $rootScope.rAuth.isAuthenticated = function() {
    return LocalAuthService.isAuthenticated();
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
}]);
