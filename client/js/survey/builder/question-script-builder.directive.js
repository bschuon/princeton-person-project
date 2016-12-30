angular.module('mwFormBuilder').directive('mwQuestionScriptBuilder', function() {
  return {
    replace: true,
    restrict: 'AE',
    require: '^mwFormQuestionBuilder',
    scope: {
      question: '=',
      readOnly: '=?',
      options: '=?'
    },
    templateUrl: '/partials/survey/builder/mw-question-script-builder.html',
    controllerAs: 'ctrl',
    bindToController: true,
    controller: [
      "mwFormUuid",
      function(mwFormUuid) {
	var ctrl = this;
	ctrl.editorOptions = {
	  lineWrapping : true,
	  lineNumbers: true,
	  theme: 'twilight',
	  mode: {name: "javascript", json: true}
	};
      }
    ],
    link: function(scope, elem, attrs, formQuestionBuilderCtrl) {
      var ctrl = scope.ctrl;
    }
  };
});
