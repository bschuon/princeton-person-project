app.controller('SurveyItemController', [
  "$rootScope",
  "$scope",
  "$state",
  "$location",
  "SurveyItemsService",
  "$stateParams",
  "LocalAuthService",
  function($rootScope, $scope, $state, $location, SurveyItemsService, $stateParams, LocalAuthService) {

    $scope.$watch('answers', function(obj){
      if (!obj) {
	return;
      }
      Object.keys(obj).forEach(function(key){
	$scope.survey.groups.forEach(function(group){
	  if(group.dependent_id === key){
	    group.show = group.dependent_value === obj[key];
	  }
	});
      });

    }, true);

    $rootScope.$watch('survey', function(){
      if(!$rootScope.survey) return;

      SurveyItemsService.find($rootScope.survey.id).then(function(response){
	$scope.recordedTime = 0;

	setInterval(function(){
	  $scope.recordedTime += 1;
	}, 1000);

	$scope.keys = Object.keys;
	$scope.answers = {};
	$scope.survey = response;
      });
    });

    $scope.submitSurvey = function() {
      SurveyItemsService.submitSurvey({recordedTime: $scope.recordedTime, survey: $scope.survey, answers: $scope.answers, userToken: LocalAuthService.getToken()}).then(function(){

	if($scope.survey.name !== "Demographics" && $scope.survey.name !== "Feedback"){
	  $state.go('user.survey', {survey_id: 'Feedback'});
	}else if($scope.survey.name === "Feedback" && !LocalAuthService.completedDemographics()){
	  $state.go('user.survey', {survey_id: 'Demographics'});
	}else if($scope.survey.name === "Demographics" && LocalAuthService.isAuthenticated()){
	  LocalAuthService.setCompletedDemographics();
	  $state.go('user.results');
	}else{
	  $state.go('user.results');
	}
      });
    };
  }
]);
