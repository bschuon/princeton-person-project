var app = angular.module('person-project', [
  'ui.router',
  'ui.bootstrap',
  'ngCookies',
  'angularModalService',
  'formly',
  'formlyBootstrap',
  'angularUtils.directives.dirPagination',
  'mwFormBuilder',
  'mwFormViewer',
  'mwFormUtils',
  'pascalprecht.translate'
]);

app.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "$httpProvider", "$translateProvider",
  function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $translateProvider) {

  /*$translateProvider.useStaticFilesLoader({
      prefix: '../dist/i18n/',
      suffix: '/angular-surveys.json'
    });
*/
    // mwForm.page.tab.heading  mwForm.page.pageWithNameCheckbox
    var translations = {
    "mwForm":{
        "form":{
            "name": "Form name",
            "name.placeholder": "Form title",
            "description": "Description"
        },
        "buttons":{
            "addPage":"Add page",
            "moveDown": "Move down",
            "moveUp": "Move up",
            "removePage": "Remove page",
            "remove": "Remove",
            "addElement": "Add element",
            "questionReady": "Ready",
            "next": "Next",
            "back": "Back",
            "submit": "Submit",
            "begin": "Begin",
            "fold": "Fold",
            "unfold": "Unfold",
            "edit": "Edit",
            "clone": "Clone",
            "view": "View"
        },
        "page":{
            "tab":{
                "heading":"Page {{page}} of {{allPages}}"
            },
            "elements":{
                "empty": "Empty page"
            },
            "pageWithNameCheckbox": "named",
            "name": "Page name"
        },
        "pageFlow":{
            "afterPage":"After page {{page}}:",
            "afterQuestionAnswer": "Go to page based on answer",
            "goToPage": "Go to page {{page.number}}",
            "goToNextPage": "Continue to next page",
            "submitForm": "Submit form"
        },
        "elements":{
            "question":"Question",
            "image":"Image",
            "paragraph": "Paragraph"
        },
        "question":{
            "types":{
                "text":{
                    "name": "Short text"
                },
                "textarea":{
                    "name": "Long text"
                },
                "radio":{
                    "name": "Radio"
                },
                "select":{
                    "name": "Select"
                },
                "checkbox":{
                    "name": "Checkboxes"
                },
                "grid":{
                    "name": "Grid"
                },
                "priority":{
                    "name": "Priority"
                },
                "division":{
                    "name": "Division"
                },
                "number":{
                    "name": "Number"
                },
                "date":{
                    "name": "Date"
                },
                "datetime":{
                    "name": "Datetime"
                },
                "time":{
                    "name": "Time"
                },
                "email":{
                    "name": "Email"
                },
                "range":{
                    "name": "Range"
                },
                "url":{
                    "name": "URL"
                }


            },
            "text": "Question text",
            "type": "Question type",
            "required": "Required",
            "preview":{
                "text":"Short answer text",
                "textarea":"Long answer text",
                "otherAnswer": "Other"
            },
            "division":{
                "quantity": "Quantity",
                "unit": "Unit label",
                "assignedSumLabel": "Assigned",
                "fromRequiredLabel":"from required"

            },
            "priority":{
                "sorted": "Sorted",
                "available": "Available",
                "clickToAddItem": "Click to add item"
            },
            "grid":{
                "rowLabel": "Row {{row}}",
                "clickToAddRow": "Click to add row",
                "columnLabel": "Column {{col}}",
                "clickToAddColumn": "Click to add column"
            },
            "range":{
                "from": "Range from",
                "to": "to"
            },
            "number": {
                "min": "Min",
                "max": "Max"
            },
            "orLabel": "or ",
            "otherLabel": "Other: ",
            "userAnswer": "User answer",
            "buttons":{
                "addOption":"Click to add option",
                "addOther":"Add 'Other'"
            }

        },
        "image":{
            "selectImageButton": "Select image",
            "caption": "Image caption"
        },
        "paragraph":{
            "placeholder": "Enter paragraph text"
        },
        "confirmationPage":{
            "title": "Confirmation page",
            "customMessage": "Custom confirmation message",
            "defaultMessage": "Your response has been recorded",
            "errorMessage": "Error! Your response has not been recorded",
            "pendingMessage": "Your response is being saved."
        }
    }

  };
    $translateProvider.translations('en', translations).preferredLanguage('en');


  $locationProvider.html5Mode(true);
  $httpProvider.interceptors.push("AuthInterceptor");
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {url: '/', templateUrl: '/partials/welcome/main.html', controller: 'SurveysController'})
  .state('terms', {url: '/terms', templateUrl: '/partials/welcome/terms.html', controller: 'UsersController'})
  .state('signup', {url: '/signup', templateUrl: '/partials/users/new.html', controller: 'UsersController'})
  .state('signin', {url: '/signin', templateUrl: '/partials/users/signin.html', controller: 'UsersController'})
  .state('surveys', {url: '/surveys', templateUrl: '/partials/surveys/index.html', controller: 'SurveysController'})
  .state('user', {url: '/users', templateUrl: '/partials/users/template.html', controller: 'UsersController'})
  .state('user.survey', {url: '/surveys/:survey_id', controller: 'SurveyController',
      views: {'' :                        {templateUrl: '/partials/surveys/show.html', controller: 'SurveyController'},
              'surveyItems@user.survey' : {templateUrl: 'partials/survey_items/show.html', controller: 'SurveyItemController as vm'}}})
  .state('user.results', {url: '/results', templateUrl: 'partials/users/results.html', controller: 'ResultsController',})
  .state('user.results_detail', {url: '/results/:completion_id', templateUrl: 'partials/users/results.html', controller: 'ResultsController',})
  .state('user.password', {url: '/password', templateUrl: 'partials/users/password.html', controller: 'UserPasswordController',})
  .state('user.profile', {url: '/profile', templateUrl: 'partials/users/profile.html', controller: 'UserProfileController',})
  .state('user.dashboard', {url: '/dashboard', templateUrl: 'partials/users/dashboard.html', controller: 'UserDashboardController',})
  .state('admin', {url: '/admin', templateUrl: '/partials/admin/dashboard.html', controller: 'AdminController'})
  .state('admin.manage', {url: '/manage', templateUrl: '/partials/admin/manage.html', controller: 'AdminController'})
  .state('admin.featured', {url: '/featured', templateUrl: '/partials/admin/featured.html', controller: 'FeaturedSurveysController'})
  .state('admin.select_surveys', {url: '/csv-surveys', templateUrl: 'partials/admin/select_surveys.html', controller: 'AdminSelectSurveysController'})
  .state('admin.select_survey_items', {url: '/csv-surveys/download', templateUrl: 'partials/admin/select_survey_items.html', controller: 'AdminSelectSurveyItemsController'})
  .state('admin.new_survey', {url: '/surveys/new', templateUrl: '/partials/surveys/new.html', controller: 'DemoController'})
  .state('admin.survey', {url: '/surveys/:survey_id', templateUrl: '/partials/surveys/show.html', controller: 'SurveyController'})
  .state('admin.surveys', {url: '/surveys', templateUrl: '/partials/admin/manage_surveys.html', controller: 'AdminSurveysController'})
  .state('admin.users', {url: '/users', templateUrl: '/partials/users/index.html', controller: 'UsersController'})
  .state('admin.user', {url: '/users/:user_id', templateUrl: '/partials/admin/show_user.html', controller: 'UsersController'})
}]);

app.run(["UsersService", "$rootScope", "LocalAuthService", "$location", "$anchorScroll", "$state",
  function(UsersService, $rootScope, LocalAuthService, $location, $anchorScroll, $state) {
  UsersService.verifyLogin();
  LocalAuthService.setToken();

  $rootScope.rAuth = {};
  $rootScope.rAuth.isAuthenticated = function() {
    return LocalAuthService.isAuthenticated();
  };

  $rootScope.goToElement = function(element) {
    if (!$state.is('home')) {
      // TODO: Get anchor scrolling to work as well.
      $state.go('home');
    }
    $location.hash(element);
    $anchorScroll();
  };

  $rootScope.rAuth.isAdmin = function() {
    return LocalAuthService.isAdmin();
  };
}]);
