angular.module('mwFormViewer').directive('mwScript', function() {
  return {
    replace: true,
    restrict: 'AE',
    require: '^mwFormQuestion',
    scope: {
      question: '=',
      questionResponse: '=',
      readOnly: '=?',
      options: '=?'
    },
    template: '<div id="mwScript"><h1>Hello Script!</h1></div>',
    controllerAs: 'ctrl',
    bindToController: true,
    controller: [
      "$timeout",
      function($timeout) {
	var ctrl = this;
	ctrl.elem = jQuery('#mwScript')[0];
	$timeout(function() {
	  var f = function() {
	    alert("unable to parse script!");
	  };
	  eval("f = " + ctrl.question.script);
	  f(jQuery, {
	    $elem: jQuery('#mwScript')[0],
	    submit: ctrl.submitForm,
	    responseId: ctrl.id	    
	  }, function(obj) {
	    ctrl.questionResponse = obj;
	  });
	}, 10);
      }
    ],
    link: function(scope, elem, attrs, mwFormQuestion) {
      var ctrl = scope.ctrl;
      ctrl.print = mwFormQuestion.print;
      ctrl.submitForm = mwFormQuestion.submitForm;
      ctrl.id = mwFormQuestion.id;
    }
  };
});
