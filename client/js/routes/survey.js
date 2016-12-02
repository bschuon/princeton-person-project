app.config([
  "$stateProvider",
  function($stateProvider) {
    $stateProvider.state('surveys', {
      url: '/surveys',
      templateUrl: '/partials/surveys/index.html',
      controller: 'SurveysController'
    });
  }
]);
