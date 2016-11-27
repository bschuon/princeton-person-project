app.service("AuthInterceptor", [
  '$location',
  '$q',
  'LocalAuthService',
  function($location, $q, LocalAuthService) {
    return {
      responseError: function(err){
        if(err.status === 401) {
          LocalAuthService.clearCredentials();
        }
        return $q.reject(err);
      }
    };
  }
]);
