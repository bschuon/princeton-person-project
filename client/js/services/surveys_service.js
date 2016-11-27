app.factory('SurveysService', [
  "$http",
  function($http) {
    var url = '/api/v1';
    return {
      all: function (includeUnlisted) {
	var promise;
	if (includeUnlisted === true) {
          promise = $http.get(url + '/surveys?all-surveys=true');
	} else {
          promise = $http.get(url + '/surveys');
	}
	return promise.then(function(response) {
          return response.data;
	});
      },
      surveyModels: function() {
        return $http.get(url + '/surveymodels').then(function(data) {
          return data.data;
        });
      },
      surveyModel: function(id) {
        return $http.get(url + '/surveymodels/' + id).then(function(data) {
          return data.data;
        });
      },

      surveyModel: function(survey_id) {
	return $http.get(url + '/surveymodels/'+ survey_id).then(function(response) {
          return response.data;
	});
      },

      surveyModels: function() {
	return $http.get(url + '/surveymodels').then(function(response) {
          return response.data;
	});
      },

      find: function(survey_id) {
	return $http.get(url + '/surveys/' + survey_id).then(function(response) {
          return response.data;
	});
      },
      requestSurvey: function(survey) {
	this.survey = survey;
      },
      featured: function() {
	return $http.get(url + '/surveys?is-featured=true').then(function(response){
          return response.data;
	});
      }
    };
  }
]);
