app.factory('LocalAuthService', [
  "$rootScope",
  function($rootScope) {
    var user;
    var isAuthenticated = function() {
      return (user !== undefined && user.id !== undefined && user.username && user.admin !== undefined);
    };
    var isBootstrapped = CONFIG.isBootstrapped;
    return {
      isAuthenticated: isAuthenticated,
      isBootstrapped: isBootstrapped,
      setBootstrapped: function() {
	isBootstrapped = true;
      },
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
	return null;
      },
      setCompletedDemographics: function(){
	user.completed_demographics = true;
      },
      userId: function() {
	if (isAuthenticated()) {
          return user.id;
	}
	return null;
      },
      username: function() {
	if (isAuthenticated()) {
          return user.username;
	}
	return null;
      },
      email: function() {
	if (isAuthenticated()) {
          return user.email;
	}
	return null;
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
  }
]);
