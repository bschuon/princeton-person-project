app.controller('AdminSurveysSchemaController', [
  "$q",
  "$scope",
  "$rootScope",
  "survey",
  "AdminSurveysService",
  function($q, $scope, $rootScope, survey, AdminSurveysService) {
    $rootScope.errors = [];
    $scope.survey = survey;
    $scope.formBuilder = {};
    $scope.formOptions = {
      autoStart: false
    };
    $scope.optionsBuilder = {
      /*elementButtons:   [{title: 'My title tooltip', icon: 'fa fa-database', text: '', callback: ctrl.callback, filter: ctrl.filter, showInOpen: true}],
       customQuestionSelects:  [
       {key:"category", label: 'Category', options: [{key:"1", label:"Uno"},{key:"2", label:"dos"},{key:"3", label:"tres"},{key:"4", label:"4"}], required: false},
       {key:"category2", label: 'Category2', options: [{key:"1", label:"Uno"},{key:"2", label:"dos"},{key:"3", label:"tres"},{key:"4", label:"4"}]}
       ],
       elementTypes: ['question', 'image']*/
    };
    $scope.formStatus = {};
    $scope.builderReadOnly = false;
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
      $rootScope.errors = [];
      AdminSurveysService.updateSurveySchema($scope.survey).then(function(data) {
	console.dir(data);
	if (data.valid) {
	  $state.go('admin.surveys.show', {id: $scope.survey.id});
	} else {
	  $rootScope.errors.push(data.error);
	}
      });
    };
  }
]);
