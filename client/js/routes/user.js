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
    });
  }
]);
