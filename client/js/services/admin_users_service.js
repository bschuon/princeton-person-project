app.factory('AdminUsersService', [
  "$http",
  function($http) {
    return {
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
