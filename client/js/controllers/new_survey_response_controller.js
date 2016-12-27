app.controller('NewSurveyResponseController', [
  '$scope',
  '$state',
  'mwFormResponseUtils',
  'Flash',
  'SurveysService',
  'survey',
  function($scope, $state, mwFormResponseUtils, Flash, SurveysService, survey) {
    $scope.survey = survey;
    $scope.formData = survey.schema;
    $scope.templateData = null;
    $scope.formStatus = {};
    $scope.formViewer = {};
    $scope.responseData = {};
    $scope.readOnly = false;
    $scope.formOptions = {
      autoStart: false
    };
    $scope.submitSurvey = function() {
      var elapsedSeconds = parseInt(((new Date).getTime() - $scope.startTime) / 1000, 10);
      var responseData = $scope.responseData;
      var headers = $scope.headersWithQuestionNumber;
      return SurveysService.submitResponse(survey, responseData, headers, elapsedSeconds).then(function(surveyResponse) {
	console.dir(surveyResponse);
	Flash.create('success', 'Survey response has been recorded!');
	$state.go('surveys.responses.results', {
	  surveyId: survey.id,
	  responseId: surveyResponse.id
	});
      }).catch(function(err) {
	Flash.create('warning', err);
      });
    };

    $scope.getMerged = function(){
      return mwFormResponseUtils.mergeFormWithResponse($scope.formData, $scope.responseData);
    };

    $scope.getQuestionWithResponseList = function(){
      return mwFormResponseUtils.getQuestionWithResponseList($scope.formData, $scope.responseData);
    };
    $scope.getResponseSheetRow = function(){
      return mwFormResponseUtils.getResponseSheetRow($scope.formData, $scope.responseData);
    };
    $scope.getResponseSheetHeaders = function(){
      return mwFormResponseUtils.getResponseSheetHeaders($scope.formData, $scope.headersWithQuestionNumber);
    };

    $scope.getResponseSheet = function(){
      return mwFormResponseUtils.getResponseSheet($scope.formData, $scope.responseData, $scope.headersWithQuestionNumber);
    };
  }
]);
