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
      },
      updateSurveySchema: function(survey) {
	var url = '/api/v1/admin/surveys/' + survey.id + '/schema';
	console.log('url:', url);
	return $http.post(url, survey).then(function(res) {
	  console.dir(res.data);
	  return res.data;
	});
      }
    };
  }
]);
