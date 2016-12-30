app.controller('AdminSurveysSchemaController', [
  "$q",
  "$scope",
  "$state",
  "Flash",
  "AdminSurveysService",
  "survey",
  function($q, $scope, $state, Flash, AdminSurveysService, survey) {    
    $scope.survey = survey;
    $scope.formBuilder = {};
    $scope.formOptions = {
      autoStart: false
    };
    $scope.formStatus = {};
    $scope.builderReadOnly = survey.status != 'draft';
    $scope.onImageSelection = function() {
      var d = $q.defer();
      var src = prompt("Please enter image src");
      if (src !=null){
        d.resolve(src);
      } else{
        d.reject();
      }
      return d.promise;
    };
    $scope.save = function() {
      AdminSurveysService.updateSurveySchema($scope.survey).then(function(model) {
	$state.go('admin.surveys.show', {id: $scope.survey.id});
      }).catch(function(err) {
	Flash.create('warning', err);
      });
    };
  }
]);
