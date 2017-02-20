app.config([
  "$stateProvider",
  function($stateProvider) {
    $stateProvider.state('user', {
      url: '/users',
      templateUrl: '/partials/user/layout.html'
    }).state('user.password', {
      url: '/password',
      templateUrl: 'partials/user/password.html',
      controller: 'UserPasswordController'
    }).state('user.profile', {
      url: '/profile',
      templateUrl: 'partials/user/profile.html',
      controller: 'UserProfileController'
    }).state('user.dashboard', {
      url: '/dashboard',
      templateUrl: 'partials/user/dashboard.html',
      controller: 'UserDashboardController'
    }).state('user.signup', {
      url: '/signup',
      templateUrl: '/partials/user/signup.html',
      controller: 'UsersController' // TODO: UserSignupController
    }).state('user.signin', {
      url: '/signin',
      templateUrl: '/partials/user/signin.html',
      controller: 'UsersController' // TODO: UserSigninController
    }).state('user.logout', {
      url: '/logout',
      controller: 'UserLogoutController'
    }).state('user.verification_sent', {
      url: '/verification-sent',
      templateUrl: '/partials/user/verification_sent.html',
      controller: 'UserVerificationSentController'
    }).state('user.resend_verification', {
      url: '/resend-verification',
      controller: 'UserResendVerificationController'
    }).state('user.verify', {
      url: '/verify?token',
      templateUrl: '/partials/user/verify.html',
      controller: 'UserVerifyController',
      resolve: {
	token: [
	  "$stateParams",
	  function($stateParams) {
	    return $stateParams.token;
	  }
	]
      }
    });
  }
]);
