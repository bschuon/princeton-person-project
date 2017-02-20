app.factory('UsersService', [
  "$http",
  "LocalAuthService",
  function($http, LocalAuthService) {
    return {
      resetPassword: function(emailOrUsername) {
	return $http.post('/api/v1/users/reset-password', {
	  emailOrUsername: emailOrUsername
	});
      },
      resendVerificationToken: function() {
	return $http.post('/api/v1/users/resend-verification-token', {});
      },
      verifyEmail: function(token) {
	console.log('verifyEmail');
	return $http.post('/api/v1/users/verify', {
	  token: token
	}).then(function(response) {
	  console.log('returning response.data:', response.data);
	  return response.data;
	}).catch(function(err) {
	  console.log('returning err', err.data.error);
	  throw err.data.error || err.data;
	});
      },
      resetPasswordWithToken: function(userId, token, newPassword) {
	return $http.post(`/api/v1/users/${userId}/reset-password`, {
	  token: token,
	  password: newPassword
	}).catch(function(err) {
	  if (err && err.data && err.data.error) {
	    return err.data.err;
	  }
	  return err.data || err;
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
      create: function(attrs) {
	return $http.post('/api/v1/users', attrs).then(function(response) {
          LocalAuthService.setUserInfo(response.data);
          return response.data;
	}).catch(function(err) {
	  console.log('UsersService.create', JSON.stringify(attrs), 'errored:', JSON.stringify(err));
	  throw err.data.error || 'Unknown error. Please try again.';
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
