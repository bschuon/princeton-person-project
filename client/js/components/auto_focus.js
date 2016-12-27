app.directive('autoFocus', function() {
  return {
    link: {
      pre: function preLink(scope, element, attr) {
	// this fails since the element hasn't rendered
	//element[0].focus();
      },
      post: function postLink(scope, element, attr) {
	// this succeeds since the element has been rendered
	element[0].focus();
      }
    }
  };
});
