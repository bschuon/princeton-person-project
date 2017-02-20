app.controller('UserVerifyController', [
  "$scope",
  "$state",
  "$timeout",
  "UsersService",
  "token",
  function($scope, $state, $timeout, UsersService, token) {
    console.log('here');
    $timeout(function() {
      console.log('here again');
      UsersService.verifyEmail(token).then(function() {
	console.log('verified email');
	// TODO: flash notice
	$state.go('home');
      }).catch(function(err) {
	// TODO: flash notice
	console.log("Unable to authenticate token:", err);
      });
    }, 400);
  }
]);
