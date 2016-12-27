app.config([
  "$stateProvider",
  function($stateProvider) {

    var availableSurveysResolver = [
      "SurveysService",
      function(SurveysService) {
	return SurveysService.getAvailableSurveys();
      }
    ];
    
    $stateProvider.state('surveys', {
      url: '/surveys',
      templateUrl: '/partials/surveys/layout.html',
      controller: 'SurveysController'
    }).state('surveys.available', {
      url: '/surveys/available',
      templateUrl: '/partials/surveys/available',
      controller: 'SurveysAvailableController',
      resolve: {
	surveys: availableSurveysResolver
      }
    });
  }
]);
