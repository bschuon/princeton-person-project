app.config([
  "$stateProvider",
  function($stateProvider) {

    var availableSurveysResolver = [
      "SurveysService",
      function(SurveysService) {
	return SurveysService.getAvailableSurveys();
      }
    ];

    var surveyResolver = [
      '$stateParams',
      'SurveysService',
      function($stateParams, SurveysService) {
	return SurveysService.getSurveyById($stateParams.surveyId);
      }
    ];

    var responseResolver = [
      '$stateParams',
      'SurveysService',
      function($stateParams, SurveysService) {
	return SurveysService.getResponseById($stateParams.responseId);
      }
    ];
    
    $stateProvider.state('surveys', {
      url: '/surveys',
      templateUrl: '/partials/surveys/layout.html',
      controller: 'SurveysController'
    }).state('surveys.available', {
      url: '/available',
      templateUrl: '/partials/surveys/available.html',
      controller: 'SurveysAvailableController',
      resolve: {
	surveys: availableSurveysResolver
      }
    }).state('surveys.responses', {
      url: '/{surveyId}/responses',
      templateUrl: '/partials/responses/layout.html',
      resolve: {
	survey: surveyResolver
      }
    }).state('surveys.responses.new', {
      url: '/new',
      templateUrl: '/partials/responses/new.html',
      controller: 'NewSurveyResponseController'
    }).state('surveys.responses.results', {
      url: '/{responseId}/results',
      templateUrl: '/partials/responses/results.html',
      controller: 'SurveyResponseResultsController',
      resolve: {
	response: responseResolver
      }
    });
  }
]);
