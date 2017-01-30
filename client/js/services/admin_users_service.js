app.factory('AdminUsersService', [
  "$http",
  function($http) {
    var unwrap = function(res) {
      if (!res.data.valid) {
	throw res.data.error;
      }
      return res.data.model || res.data.collection || null;
    };

    return {
      getUserById: function(id) {
	return $http.get('/api/v1/admin/users/' + id).then(unwrap);
      },
      createUser: function(user) {
	return $http.post('/api/v1/admin/users', user).then(function(response) {
	  return response.data;
	});
      },
      createAdmin: function(admin) {
	return $http.post('/api/v1/admin/users', admin).then(function(response) {
          return response.data;
	});
      },
      deleteAdmin: function(userId) {
	return $http.delete('/api/v1/admin/users/' + userId).then(function(response) {
          return response.data;
	});
      },
      getUsers: function() {
	return $http.get('/api/v1/admin/users').then(function(response) {
          return response.data;
	});
      },
      find: function(user) {
	return $http.get('/api/v1/admin/users/' + user.id).then(function(response) {
          return response.data;
	});
      }
    };
  }
]);
