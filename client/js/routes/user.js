app.config([
  "$stateProvider",
  function($stateProvider) {
    $stateProvider.state('user', {
      url: '/users',
      templateUrl: '/partials/users/user_layout.html'
    }).state('user.survey', {
      url: '/surveys/:survey_id',
      controller: 'SurveyController',
      views: {
	'': {
	  templateUrl: '/partials/surveys/take.html',
	  controller: 'SurveyController'
	},
	'surveyItems@user.survey': {
	  templateUrl: 'partials/survey_items/show.html',
	  controller: 'SurveyItemController as vm'
	}
      }
    }).state('user.results', {
      url: '/results',
      templateUrl: 'partials/users/results.html',
      controller: 'ResultsController'
    }).state('user.results_detail', {
      url: '/results/:completion_id',
      templateUrl: 'partials/users/results.html',
      controller: 'ResultsController'
    }).state('user.password', {
      url: '/password',
      templateUrl: 'partials/users/password.html',
      controller: 'UserPasswordController'
    }).state('user.profile', {
      url: '/profile',
      templateUrl: 'partials/users/profile.html',
      controller: 'UserProfileController'
    }).state('user.dashboard', {
      url: '/dashboard',
      templateUrl: 'partials/users/dashboard.html',
      controller: 'UserDashboardController'
    }).state('user.signup', {
      url: 'signup',
      templateUrl: '/partials/users/signup.html',
      controller: 'UsersController' // TODO: UserSignupController
    }).state('user.signin', {
      url: '/signin',
      templateUrl: '/partials/users/signin.html',
      controller: 'UsersController' // TODO: UserSigninController
    }).state('user.logout', {
      url: '/logout',
      controller: 'UserLogoutController'
    });
  }
]);
