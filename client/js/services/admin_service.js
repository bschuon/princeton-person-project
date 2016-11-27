app.factory('AdminService', [
  "$http",
  "$window",
  function($http, $window) {

    var url = '/api/v1/admin';

    return {
      surveys: {
	all: function() {
          return $http.get(url + '/surveys').then(function(data) {
            return data.data;
          });
	},
	featuredOrder: function(order) {
          return $http.post(url + '/surveys/featured-order', order).then(function(data) {
            return data.data;
          });
	},
	items: function(ids) {
          var query;
          if (Array.isArray(ids)) { query = '?id=' + ids.join('&id='); }
          else { query = "?id=" + ids; }
          return $http.get(url + '/surveys/items' + query).then(function(data) {
            return data.data;
          });
	},
	csv: function(surveyQuestions, include) {
          var query = '?sid=' + Object.keys(surveyQuestions).join('&sid=');
          for (id in surveyQuestions) {
            var param = 'q' + id;
            query += '&' + param + '=' + surveyQuestions[id].join('&' + param + "=");
          }
          if (include && (include === "first" || include === "last" || include === "all")) {
            query += "&include=" + include;
          }

          $window.open('/api/v1/admin/surveys/csv' + query);
	}
      }
    };
  }
	  ]);
