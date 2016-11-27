app.controller('AdminSurveysController', [
  "$scope",
  "SurveysService",
  "SurveyItemsService",
  "ModalService",
  "AdminService",
  "$state",
  "$q",
  "$http",
  "$translate",
  "mwFormResponseUtils",
  "$location",
  function($scope, SurveysService, SurveyItemsService, ModalService,
	   AdminService, $state, $q,$http, $translate, mwFormResponseUtils, $location) {
    var survey_id = $state.params.survey_id;

    if (!!survey_id) {
      SurveysService.surveyModel(survey_id).then(function(data) {
	ctrl.formData = data.survey;
	ctrl.surveyId = survey_id;
	$scope.textModel = angular.toJson(ctrl.formData);
      });
    }

    var ctrl = this;
    ctrl.mergeFormWithResponse = true;
    ctrl.cgetQuestionWithResponseList = true;
    ctrl.cgetResponseSheetHeaders = true;
    ctrl.cgetResponseSheetRow = true;
    ctrl.cgetResponseSheet = true;
    ctrl.headersWithQuestionNumber = true;
    ctrl.builderReadOnly = false;
    ctrl.viewerReadOnly = false;
    ctrl.languages = ['en', 'pl', "es"];

    var formData = {
      "name": "form name",
      "description": "description",
      "pages": [
	{
	  "id": "",
	  "number": 1,
	  "name": null,
	  "description": null,
	  "pageFlow": {
	    "nextPage": true,
	    "label": "mwForm.pageFlow.goToNextPage"
	  },
	  "elements": [ ],
	  "namedPage": false
	}
      ],
      "name": "Form name",
      "description": "Form description "
    };
    ctrl.formData = formData;

    ctrl.formBuilder= {};
    ctrl.formViewer = {};
    ctrl.formOptions = {
      autoStart: false
    };

    ctrl.optionsBuilder={
    };

    ctrl.formStatus= {};
    ctrl.responseData = {};
    var responseData =  {};
    ctrl.responseData = responseData;
    var templateData = {};
    ctrl.templateData = templateData;
    ctrl.showResponseRata=false;

    ctrl.saveSurvey = function(){
      return $http.post("/api/v1/admin/surveymodels", {
	survey: ctrl.formData,
	version_id: 1,
	estimated_time: 600
      }).then(function(res) {
	if (!res.data) {
	  alert("unknown error");
	} else if (!res.data.valid) {
	  alert(res.data.error);
	} else {
	  window.location.href = "/admin/surveys/" + res.data.id;
	}
      });
    };

    ctrl.updateSurveyModel= function(){
      var survey = angular.element('#myTextArea').val();
      var id = ctrl.surveyId;
      ctrl.formData = survey;
      return $http.post("/api/v1/admin/surveymodels/"+ id , {
	survey: survey,
	version_id: 1,
	estimated_time: 600
      }).then(function(res) {
	if (!res.data) {
	  alert("unknown error");
	} else if (!res.data.valid) {
	  alert(res.data.error);
	} else {
	  window.location.href = "/admin/surveys/" + res.data.model.id;
	}
      });
    };

    ctrl.saveSurveyJson= function(){
      var survey = angular.element('#myTextArea').val();
      return $http.post("/api/v1/admin/surveymodels" , {
	survey: survey,
	version_id: 1,
	estimated_time: 600
      }).then(function(res) {
	debugger; // TODO: remove
	if (!res.data) {
	  alert("unknown error");
	} else if (!res.data.valid) {
	  alert(res.data.error);
	} else {
	  window.location.href = "/admin/surveys";
	}
      });
    };

    ctrl.onImageSelection = function (){

      var d = $q.defer();
      var src = prompt("Please enter image src");
      if(src !=null){
	d.resolve(src);
      }else{
	d.reject();
      }

      return d.promise;
    };

    ctrl.resetViewer = function(){
      if(ctrl.formViewer.reset){
	ctrl.formViewer.reset();
      }

    };

    ctrl.resetBuilder= function(){
      if(ctrl.formBuilder.reset){
	ctrl.formBuilder.reset();
      }
    };

    ctrl.changeLanguage = function (languageKey) {
      $translate.use(languageKey);
    };

    ctrl.getMerged = function(){
      return mwFormResponseUtils.mergeFormWithResponse(ctrl.formData, ctrl.responseData);
    };

    ctrl.getQuestionWithResponseList = function(){
      return mwFormResponseUtils.getQuestionWithResponseList(ctrl.formData, ctrl.responseData);
    };
    ctrl.getResponseSheetRow = function(){
      return mwFormResponseUtils.getResponseSheetRow(ctrl.formData, ctrl.responseData);
    };
    ctrl.getResponseSheetHeaders = function(){
      return mwFormResponseUtils.getResponseSheetHeaders(ctrl.formData, ctrl.headersWithQuestionNumber);
    };

    ctrl.getResponseSheet = function(){
      return mwFormResponseUtils.getResponseSheet(ctrl.formData, ctrl.responseData, ctrl.headersWithQuestionNumber);
    };

    $scope.dismissEdit = function() {
      $scope.editingSurvey = undefined;
      $scope.surveyJSON = undefined;
    };

    $scope.viewSurvey = function(survey) {
      $scope.currentSurvey = survey;
      ctrl.formData = survey.survey;
      $location.path('/admin/surveys/' + survey.id);
    };

    SurveysService.surveyModels().then(function(data) {
      $scope.surveys = data;
    });

    $scope.showSurvey = function(survey) {
      $scope.editingSurvey = true;
      $scope.currentSurvey = SurveysService.surveyModel(survey.id).then(function(data) {
	$scope.surveys = data;;
      });

      var formData = $scope.currentSurvey.survey;

    };

    $scope.newSurvey = function() {

      $scope.surveyJSON = {
	survey: {
	  name: "",
	  est_completion_time_minutes: 20,
	  is_featured:false,
	  position: null,
	  is_listed:true,
	  status: "In progress",
	  algorithm: "average"
	},
	groups: []
      };
      $scope.editingSurvey = true;
    };

    $scope.dismissEdit = function() {
      $scope.editingSurvey = undefined;
      $scope.surveyJSON = undefined;
    };

    $scope.createSurvey = function() {
      $state.go('admin.new_survey');
    };

    $scope.deleteSurvey = function(survey) {
      ModalService.showModal({
	templateUrl: "/partials/admin/delete_survey_modal.html",
	controller: "ModalController"
      }).then(function(modal) {
	modal.element.modal();
	modal.close.then(function(result) {
	  if (result === "DELETE") {
	    $scope.surveys = $scope.surveys.filter(function(s) {
	      return s.id !== survey.id;
	    });
	  }
	});
      });
    };
  }
]);
