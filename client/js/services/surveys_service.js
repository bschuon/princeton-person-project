app.factory('SurveysService', [
  "$http",
  "mwFormResponseUtils",
  function($http, mwFormResponseUtils) {
    var unwrap = function(res) {
      if (!res.data.valid) {
	throw res.data.error;
      }
      return res.data.model || res.data.collection || null;
    };

    return {
      getAvailableSurveys: function() {
	return $http.get('/api/v1/surveys/available').then(unwrap);
      },
      getSurveyById: function(id) {
	return $http.get('/api/v1/surveys/' + id).then(unwrap);
      },
      getResponseById: function(id) {
	return $http.get('/api/v1/responses/' + id).then(unwrap);
      },
      submitResponse: function(survey, responseData, headers, elapsedTime) {
	return $http.post('/api/v1/responses', {
	  surveyId: survey.id,
	  recordedTime: elapsedTime,
	  responseData: responseData,
	  merged: mwFormResponseUtils.mergeFormWithResponse(survey.schema, responseData),
	  questionWithResponseList: mwFormResponseUtils.getQuestionWithResponseList(survey.schema, responseData),
	  responseSheetRow: mwFormResponseUtils.getResponseSheetRow(survey.schema, responseData),
	  responseSheetHeaders: mwFormResponseUtils.getResponseSheetHeaders(survey.schema, headers),
	  responseSheet: mwFormResponseUtils.getResponseSheet(survey.schema, responseData, headers)
	}).then(unwrap);
      }
    };
  }
]);
