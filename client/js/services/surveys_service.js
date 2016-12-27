app.factory('SurveysService', [
  "$http",
  function($http) {
    return {
      getAvailableSurveys: function() {
	return $http.get('/api/v1/surveys/available', function(res) {
	  if (!res.data.valid) {
	    throw res.data.error;
	  }
	  return res.data.list;
	});
      }
    };
  }
]);
