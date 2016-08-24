
angular.module('mwFormBuilder').directive('mwLabel', function () {

    return {
        replace: true,
        restrict: 'AE',
        scope: {
            labelKey: "@?",
            labelText: "@?",
            labelFor: "@",
            labelClass: "@",
            labelTranslateValues: "="
        },
        templateUrl: '/partials/forms/builder/templates/bootstrap/mw-label.html',
        controllerAs: 'ctrl',
        bindToController: true,
        controller: function(mwFormUuid){
            var ctrl = this;

        },
        link: function (scope, ele, attrs){

        }
    };
});
