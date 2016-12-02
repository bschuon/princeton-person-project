app.config([
  "$stateProvider",
  function($stateProvider) {
    $stateProvider.state('admin', {
      url: '/admin',
      templateUrl: '/partials/admin/layout.html'
    }).state('admin.surveys', {
      url: '/surveys',
      templateUrl: '/partials/admin/surveys/layout.html'
    }).state('admin.surveys.index', {
      url: '/',
      templateUrl: '/partials/admin/surveys/index.html',
      controller: 'AdminSurveysIndexController'
    }).state('admin.users', {
      url: '/users',
      templateUrl: '/partials/users/index.html',
      controller: 'UsersController'
    }).state('admin.users.roles', {
      url: '/roles',
      templateUrl: '/partials/admin/users/roles.html',
      controller: 'AdminController'
    }).state('admin.users.show', {
      url: '/:user_id',
      templateUrl: '/partials/admin/users/show.html',
      controller: 'UsersController'
    });
  }
]);
