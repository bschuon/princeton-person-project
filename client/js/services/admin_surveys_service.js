app.factory("AdminSurveysService", [
  "$http",
  function($http) {
    return {
      getSurveyById: function(id) {
	return $http.get('/api/v1/admin/surveys/' + id).then(function(res) {
	  return res.data;
	});
      },
      getSurveys: function() {
	return $http.get('/api/v1/admin/surveys').then(function(res) {
	  return res.data.data;
	});
      },
      createSurvey: function(survey) {
	survey.version_id = 0;
	return $http.post('/api/v1/admin/surveys', survey).then(function(res) {
	  return res.data;
	});
      }
    };
  }
]);
