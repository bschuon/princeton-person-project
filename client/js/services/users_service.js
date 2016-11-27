app.factory('UsersService', [
  "$http",
  "LocalAuthService",
  function($http, LocalAuthService) {
    function parseSurvey (survey) {
      if (survey.value) {
	survey.value = JSON.parse(survey.value);
      }
      if (survey.score) {
	survey.score = JSON.parse(survey.score);
      }
      return survey;
    }
    var users;
    return {
      completedSurveys: function() {
	return $http.get('/api/v1/users/completed-surveys').then(function(response) {
          response.data.rows = response.data.rows.map(parseSurvey);
          return response.data;
	});
      },
      changePassword: function(password, new_password) {
	return $http.put('/api/v1/users/password', {
	  password: password,
	  new_password: new_password
	}).then(function(response) {
          return response.data;
	});
      },
      changeProfile: function(profile) {
	return $http.put('/api/v1/users/profile', profile).then(function(response) {
          return response.data;
	});
      },
      result: function(completion_id) {
	return $http.post('/api/v1/users/result', {
	  completion_id: completion_id,
	  userToken: LocalAuthService.getToken()
	}).then(function (response) {
          return parseSurvey(response.data);
	});
      },
      migrate: function() {
	return $http.post('/api/v1/users/migrate', {
	  userToken: LocalAuthService.getToken()
	}).then(function(response) {
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
      find: function(user) {
	return $http.get('/api/v1/users/' + user.id).then(function(response) {
          return response;
	});
      },
      logout: function() {
	return $http.delete('/api/v1/users/session').then(function(response) {
          LocalAuthService.clearCredentials();
          return response.data;
	}).catch(function(error) {
          LocalAuthService.clearCredentials();
          return error;
	});
      },
      destroy: function() {
	return $http.delete('/api/v1/users').then(function(response) {
          return response;
	});
      }
    };
  }
]);
