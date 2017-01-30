app.controller('AdminSurveysIndexController', [
  "$scope",
  "$state",
  "$timeout",
  "Flash",
  "Upload",
  "surveys",
  function($scope, $state, $timeout, Flash, Upload, surveys) {
    $scope.noSurveys = surveys.length == 0;
    $scope.surveys = surveys;
    $scope.navSurvey = function(id) {
      $state.go('admin.surveys.show', {id: id});
    };
    $scope.import = function(file, errFiles) {
      $scope.f = file;
      $scope.errFile = errFiles && errFiles[0];
      if (file) {
	file.upload = Upload.upload({
	  url: "/api/v1/admin/surveys/import",
	  data: {
	    file: file
	  }
	});
	file.upload.then(function(res) {
	  $timeout(function() {
	    if (res.data.valid) {
	      Flash.create('success', 'Survey file imported!');
	      $state.go('admin.surveys.show', {id: res.data.model.id});
	    } else {
	      Flash.create('danger', res.data.error);
	    }
	  });
	}, function(err) {
	  Flash.create('danger', err.message || err);
	});
      }
      
    };
  }
]);

