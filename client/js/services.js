
/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */

app.service("AuthInterceptor", ['$location', '$q', 'LocalAuthService',
  function($location,$q, LocalAuthService){
    return {
      responseError: function(err){
        if(err.status === 401) {
          LocalAuthService.clearCredentials();
        }
        return $q.reject(err);
      }
    };
}]);

/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */

app.factory('LocalAuthService', ["$rootScope", function($rootScope) {
  var user;

  var isAuthenticated = function() {
    return (user !== undefined && user.id !== undefined && user.username && user.admin !== undefined);
  };
  return {
    isAuthenticated: isAuthenticated,
    setUserInfo: function(userInfo) {
      if (userInfo && userInfo.username && userInfo.admin !== undefined) {
        user = userInfo;
        $rootScope.$broadcast('login');
        if (userInfo.facebook_user_info && userInfo.facebook_user_info.displayName) {
          user.username = user.displayName;
        } else if (userInfo.facebook_user_info && userInfo.facebook_user_info.givenName) {
          user.username = user.facebook_user_info.givenName;
        }
      }
    },
    clearCredentials: function() {
      user = undefined;
    },
    isAdmin: function() {
      return (isAuthenticated() && user.admin);
    },
    completedDemographics: function(){
      if (isAuthenticated()) {
        return user.completed_demographics;
      }
    },
    setCompletedDemographics: function(){
      user.completed_demographics = true;
    },
    userId: function() {
      if (isAuthenticated()) {
        return user.id;
      }
    },
    username: function() {
      if (isAuthenticated()) {
        return user.username;
      }
    },
    email: function() {
      if (isAuthenticated()) {
        return user.email;
      }
    },
    setToken: function () {
      if(!localStorage.getItem('userToken')){
        localStorage.setItem("userToken", uuid.v4());
      }
    },
    getToken: function () {
      return localStorage.getItem('userToken');
    }
  };
}]);

/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */

app.factory('AdminService', ["$http", "$window",
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
}]);

/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */

app.factory('SurveyItemsService', ["$http",
  function ($http) {

  var url = '/api/v1';
  return {
    submitSurvey: function(results){
      return $http.post(url + '/survey-items', results);
    },
    find: function(id){
      return $http.get(url + '/survey-items/' + id)
      .then(function (response) {
        return response.data;
      })
    },
    getScore: function (results) {
      if(results.length === 0){
        return 0;
      } else {
        var _this = this;
        var answers = results.map(function (num) {
          if(typeof(num)==='object'){
            num = _this.getSubScore(num);
          }
          return Number(num);
        })
        answers = answers.filter(function (answer) {
          var nan = isNaN(answer);
          return !nan;
        })
        return answers.reduce(function (sum, num) {
          return sum + num;
        })
      }
    },
    getDependent: function (itemsArray, id) {
      var dependent;
      itemsArray.forEach(function (item, i) {
        if(item.id === id){ dependent = i };
      })
      return dependent;
    },
    getSubScore: function(answers) {
      if(answers.length === 0){
        return 0;
      } else {
        return answers.reduce(function (sum, num) {
          return sum + num;
        })
      }
    },
    sortItemsByPosition: function (items) {
      return items.sort(function (item1, item2) {
        return item1.position - item2.position;
      })
    },
    shuffle: function (items) {
      for(var i=items.length-1; i>=0; i--){
        var randomIndex = Math.floor(Math.random()*(i+1));
        var itemAtIndex = items[randomIndex];
        items[randomIndex] = items[i];
        items[i] = itemAtIndex;
      }
      return items;
    },
    hasUnansweredQuestions: function (answers, questions) {
      var emptySubQuestions = 0;
      var emptyQuestions = answers.length < questions;
      answers.forEach(function (answer) {
        if(typeof(answer) === 'object' && answer.length === 0){
          emptySubQuestions += 1;
        }
      })
      if(emptyQuestions || emptySubQuestions > 0){
        return true;
      }
    }
  };
}]);

/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */

app.factory('SurveysService', ["$http",
  function ($http) {

  var url = '/api/v1';
  return {
    all: function (includeUnlisted) {
      var promise;
      if (includeUnlisted === true) {
        promise = $http.get(url + '/surveys?all-surveys=true');
      } else {
        promise = $http.get(url + '/surveys');
      }
      return promise.then(function (response) {
        return response.data;
      });
    },

    surveyModel: function (survey_id) {
      return $http.get(url + '/surveymodels/'+ survey_id).then(function (response) {
        return response.data;
      })
    },

    surveyModels: function () {
      return $http.get(url + '/surveymodels').then(function (response) {
        return response.data;
      })
    },

    find: function (survey_id) {
      return $http.get(url + '/surveys/' + survey_id).then(function (response) {
        return response.data;
      })
    },
    requestSurvey: function (survey) {
      this.survey = survey;
    },
    featured: function() {
      return $http.get(url + '/surveys?is-featured=true').then(function(response){
        return response.data;
      })
    }
  };
}]);

/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */

app.factory('UsersService', ["$http", "LocalAuthService",
  function($http, LocalAuthService) {
  function parseSurvey (survey) {
    console.log(survey)
    if (survey.value) {
      survey.value = JSON.parse(survey.value)
    }
    if (survey.score) {
      survey.score = JSON.parse(survey.score)
    }
    return survey
  }
  var users;
  return {
    completedSurveys: function() {
      return $http.get('/api/v1/users/completed-surveys').then(function (response) {
        response.data.rows = response.data.rows.map(parseSurvey)
        return response.data;
      });
    },
    changePassword: function(password, new_password) {
      return $http.put('/api/v1/users/password', {password: password, new_password: new_password}).then(function (response) {
        return response.data;
      });
    },
    changeProfile: function(profile) {
      return $http.put('/api/v1/users/profile', profile).then(function (response) {
        return response.data;
      });
    },
    result: function(completion_id) {
      return $http.post('/api/v1/users/result', {completion_id: completion_id, userToken: LocalAuthService.getToken()}).then(function (response) {
        return parseSurvey(response.data);
      });
    },
    migrate: function() {
      return $http.post('/api/v1/users/migrate', {userToken: LocalAuthService.getToken()}).then(function (response) {
        return response.data;
      });
    },
    create: function(attrs) {
      return $http.post('/api/v1/users', attrs).then(function (response) {
        LocalAuthService.setUserInfo(response.data);
        return response.data;
      });
    },
    verifyLogin: function() {
      return $http.get('/api/v1/users/me').then(function(response) {
        LocalAuthService.setUserInfo(response.data);
        return response.data;
      });
    },
    signin: function (user) {
      return $http.post('/api/v1/users/signin', user ).then(function (response) {
        LocalAuthService.setUserInfo(response.data);
        return response.data;
      });
    },
    createAdmin: function (admin) {
      return $http.post('/api/v1/admin/users', admin).then(function (response) {
        return response.data;
      });
    },
    deleteAdmin: function(userId) {
      return $http.delete('/api/v1/admin/users/' + userId).then(function(response) {
        return response.data;
      });
    },
    getAdmins: function() {
      return $http.get('/api/v1/admin/users').then(function(response) {
        return response.data;
      });
    },
    find: function(user){
      return $http.get('/api/v1/users/' + user.id).then(function (response) {
        return response
      })
    },
    logout: function() {
      return $http.delete('/api/v1/users/session').then(function(response) {
        LocalAuthService.clearCredentials();
        return response.data;
      }).catch(function(error) {
        LocalAuthService.clearCredentials();
        return error;
      })
    },
    destroy: function() {
      return $http.delete('/api/v1/users').then(function (response) {
        return response;
      })
    }
  };
}]);

/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */
