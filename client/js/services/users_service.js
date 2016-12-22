app.factory('UsersService', [
  "$http",
  "LocalAuthService",
  function($http, LocalAuthService) {
    return {
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
