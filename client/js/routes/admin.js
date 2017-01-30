app.config([
  "$stateProvider",
  function($stateProvider) {

    var adminSurveyResolver = [
      "$stateParams",
      "AdminSurveysService",
      function($stateParams, AdminSurveysService) {
	return AdminSurveysService.getSurveyById($stateParams.id);
      }
    ];

    var adminSurveysResolver = [
      "AdminSurveysService",
      function(AdminSurveysService) {
	return AdminSurveysService.getSurveys();
      }
    ];

    var adminUsersResolver = [
      "AdminUsersService",
      function(AdminUsersService) {
	return AdminUsersService.getUsers();
      }
    ];

    var adminUserResolver = [
      "$stateParams",
      "AdminUsersService",
      function($stateParams, AdminUsersService) {
	return AdminUsersService.getUserById($stateParams.id);
      }
    ];


    // Admin Dashboard
    $stateProvider.state('admin', {
      url: '/admin',
      templateUrl: '/partials/admin/layout.html',
      controller: 'AdminController'
    });

    // Surveys
    $stateProvider.state('admin.surveys', {
      url: '/surveys',
      templateUrl: '/partials/admin/surveys/layout.html',
      controller: 'AdminSurveysController'
    }).state('admin.surveys.index', {
      url: '/',
      templateUrl: '/partials/admin/surveys/index.html',
      controller: 'AdminSurveysIndexController',
      resolve: {
	surveys: adminSurveysResolver
      }
    }).state('admin.surveys.new', {
      url: '/new',
      templateUrl: '/partials/admin/surveys/new.html',
      controller: 'AdminSurveysNewController'
    }).state('admin.surveys.show', {
      url: '/{id}',
      templateUrl: '/partials/admin/surveys/show.html',
      controller: 'AdminSurveysShowController',
      resolve: {
	survey: adminSurveyResolver
      }
    }).state('admin.surveys.schema', {
      url: '/{id}/schema/edit',
      templateUrl: '/partials/admin/surveys/schema.html',
      controller: 'AdminSurveysSchemaController',
      resolve: {
	survey: adminSurveyResolver
      }
    }).state('admin.surveys.scoring', {
      url: '/{id}/scoring',
      templateUrl: '/partials/admin/surveys/scoring.html',
      controller: 'AdminSurveysScoringController',
      resolve: {
	survey: adminSurveyResolver
      }
    });

    // Responses
    $stateProvider.state('admin.responses', {
      url: '/responses',
      templateUrl: '/partials/admin/responses/layout.html',
      controller: 'AdminResponsesController'
    }).state('admin.responses.index', {
      url: '/',
      templateUrl: '/partials/admin/responses/index.html',
      controller: 'AdminResponsesIndexController'
    });

    // Experiments
    $stateProvider.state('admin.experiments', {
      url: '/experiments',
      templateUrl: '/partials/admin/experiments/layout.html',
      controller: 'AdminExperimentsController'
    }).state('admin.experiments.index', {
      url: '/',
      templateUrl: '/partials/admin/experiments/index.html',
      controller: 'AdminExperimentsIndexController'
    });

    // Users
    $stateProvider.state('admin.users', {
      url: '/users',
      templateUrl: '/partials/admin/users/layout.html',
      controller: 'AdminUsersController'
    }).state('admin.users.index', {
      url: '/',
      templateUrl: '/partials/admin/users/index.html',
      controller: 'AdminUsersIndexController',
      resolve: {
	users: adminUsersResolver
      }
    }).state('admin.users.new', {
      url: '/new',
      templateUrl: '/partials/admin/users/new.html',
      controller: 'AdminUsersNewController'
    }).state('admin.users.roles', {
      url: '/roles',
      templateUrl: '/partials/admin/users/roles.html',
      controller: 'AdminUsersRolesController'
    }).state('admin.users.show', {
      url: '/:id',
      templateUrl: '/partials/admin/users/show.html',
      controller: 'AdminUsersShowController',
      resolve: {
	user: adminUserResolver
      }
    }).state('admin.users.edit', {
      url: '/:id/edit',
      templateUrl: '/partials/admin/users/edit.html',
      controller: 'AdminUsersEditController',
      resolve: {
	user: adminUserResolver
      }
    });
  }
]);
