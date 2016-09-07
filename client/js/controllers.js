/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */




app.controller('AdminController', ["$scope", "UsersService", "ModalService",
  function ($scope, UsersService, ModalService) {
    $scope.admin = {};
    $scope.users = [];

    UsersService.getAdmins().then(function (users) {
      $scope.users = users;
    });

    $scope.deleteAdmin = function(userId) {
      ModalService.showModal({
        templateUrl: "/partials/admin/delete_admin_modal.html",
        controller: "ModalController",
      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          if (result === "DELETE") {
            UsersService.deleteAdmin(userId).then(function() {
              $scope.users = $scope.users.filter(function(user) {
                return user.id !== userId;
              });
            });
          }
        });
      });
    };

    $scope.createAdmin = function () {
      UsersService.createAdmin($scope.admin).then(function (response) {
        if(response.error){
          $scope.admin = {};
          $scope.errors = response.error;
        } else {
          $scope.admin = {};
          $scope.users.push(response)
        }
      });
    };




}]);

/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */

app.controller('ModalController', ["$scope", "close",
  function($scope, close) {
    $scope.dismissModal = function(result) {
      close(result, 200);
    }

}]);

/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */

app.controller('AdminSurveysController', ["$scope", "SurveysService", "SurveyItemsService", "ModalService", "AdminService", "$state", "$q","$http","$translate","mwFormResponseUtils",
  function($scope, SurveysService, SurveyItemsService, ModalService, AdminService, $state, $q,$http, $translate, mwFormResponseUtils) {
    $scope.surveys;
    $scope.editingSurvey;
    $scope.surveyJSON;
    $scope.currentSurvey = {};

    var ctrl = this;
    ctrl.mergeFormWithResponse = true;
    ctrl.cgetQuestionWithResponseList = true;
    ctrl.cgetResponseSheetHeaders = true;
    ctrl.cgetResponseSheetRow = true;
    ctrl.cgetResponseSheet = true;
    ctrl.headersWithQuestionNumber = true;
    ctrl.builderReadOnly = false;
    ctrl.viewerReadOnly = false;
    ctrl.languages = ['en', 'pl', "es"];
    ctrl.formData = {};

    var formData = {
      "name": "form name",
      "description": "description",

      "pages": [
      {
      "id": "f6b87dc9142722d4bd2d0dc24b633fa3",
      "number": 1,
      "name": null,
      "description": null,
      "pageFlow": {
      "nextPage": true,
      "label": "mwForm.pageFlow.goToNextPage"
      },
      "elements": [
      {
      "id": "39b0e9fa91ba7c23efa60cb1218e2e00",
      "orderNo": 1,
      "type": "question",
      "question": {
      "id": "b22de786a20090fce1027ad7881c729a",
      "text": "Please answer the following",
      "type": "grid",
      "required": true,
      "grid": {
      "rows": [
      {
      "id": "74fc1726c31bb24fc486770280e543a3",
      "orderNo": 1,
      "label": "I am quick to sense the hunger contractions of my stomach."
      },
      {
      "id": "585d90ad2f6ab4bb0568e91cf9752e9a",
      "orderNo": 2,
      "label": "I'm sensitive to internal bodily tensions."
      },
      {
      "id": "b684ec339174b1a13b56f47407b09d61",
      "orderNo": 3,
      "label": "I know immediately when my mouth or throat gets dry."
      },
      {
      "id": "10a6da136268bf420edf94624e1f77b1",
      "orderNo": 4,
      "label": "I can often feel my heart beating."
      },
      {
      "id": "e973ed2c5e794a18ec4e27ddb6594b2d",
      "orderNo": 5,
      "label": "I'm very aware of changes in my body temperature"
      }
      ],
      "cols": [
      {
      "id": "c124c05949c5544c2fc3b181fb3572ba",
      "orderNo": 1,
      "label": "extremely uncharacteristic"
      },
      {
      "id": "155cee20f44e442a43854b6f20e03cb3",
      "orderNo": 2,
      "label": "."
      },
      {
      "id": "f514536d7e0914219a6a3e310a898e4f",
      "orderNo": 3,
      "label": "."
      },
      {
      "id": "52a91e5176fe41387ed13e3d57466556",
      "orderNo": 4,
      "label": "."
      },
      {
      "id": "8dd774353c6f0df55ea62ee9ab0d6c41",
      "orderNo": 5,
      "label": "extremely characteristic"
      }
      ]
      },
      "pageFlowModifier": false
      }
      }
      ],
      "namedPage": false
      }
      ],
      "name": "Body Consciousness Scale",
      "description": "Please rate the following statements as they relate to your personal experience as accurately as possible on the provided scale."
      }
;


        ctrl.formData = formData;

        ctrl.formBuilder={};
        ctrl.formViewer = {};
        ctrl.formOptions = {
            autoStart: false
        };

        ctrl.optionsBuilder={
        };

        ctrl.formStatus= {};
        ctrl.responseData={
          "name": "form name",
          "description": "description",

          "pages": [
          {
          "id": "f6b87dc9142722d4bd2d0dc24b633fa3",
          "number": 1,
          "name": null,
          "description": null,
          "pageFlow": {
          "nextPage": true,
          "label": "mwForm.pageFlow.goToNextPage"
          },
          "elements": [
          {
          "id": "39b0e9fa91ba7c23efa60cb1218e2e00",
          "orderNo": 1,
          "type": "question",
          "question": {
          "id": "b22de786a20090fce1027ad7881c729a",
          "text": "Please answer the following",
          "type": "grid",
          "required": true,
          "grid": {
          "rows": [
          {
          "id": "74fc1726c31bb24fc486770280e543a3",
          "orderNo": 1,
          "label": "I am quick to sense the hunger contractions of my stomach."
          },
          {
          "id": "585d90ad2f6ab4bb0568e91cf9752e9a",
          "orderNo": 2,
          "label": "I'm sensitive to internal bodily tensions."
          },
          {
          "id": "b684ec339174b1a13b56f47407b09d61",
          "orderNo": 3,
          "label": "I know immediately when my mouth or throat gets dry."
          },
          {
          "id": "10a6da136268bf420edf94624e1f77b1",
          "orderNo": 4,
          "label": "I can often feel my heart beating."
          },
          {
          "id": "e973ed2c5e794a18ec4e27ddb6594b2d",
          "orderNo": 5,
          "label": "I'm very aware of changes in my body temperature"
          }
          ],
          "cols": [
          {
          "id": "c124c05949c5544c2fc3b181fb3572ba",
          "orderNo": 1,
          "label": "extremely uncharacteristic"
          },
          {
          "id": "155cee20f44e442a43854b6f20e03cb3",
          "orderNo": 2,
          "label": "."
          },
          {
          "id": "f514536d7e0914219a6a3e310a898e4f",
          "orderNo": 3,
          "label": "."
          },
          {
          "id": "52a91e5176fe41387ed13e3d57466556",
          "orderNo": 4,
          "label": "."
          },
          {
          "id": "8dd774353c6f0df55ea62ee9ab0d6c41",
          "orderNo": 5,
          "label": "extremely characteristic"
          }
          ]
          },
          "pageFlowModifier": false
          }
          }
          ],
          "namedPage": false
          }
          ],
          "name": "Body Consciousness Scale",
          "description": "Please rate the following statements as they relate to your personal experience as accurately as possible on the provided scale."
};

            var responseData =  {}


          ctrl.responseData = responseData;

          var templateData = {}


        ctrl.templateData =   templateData;

        ctrl.showResponseRata=false;


        ctrl.saveResponse = function(){

        };

        ctrl.onImageSelection = function (){

            var d = $q.defer();
            var src = prompt("Please enter image src");
            if(src !=null){
                d.resolve(src);
            }else{
                d.reject();
            }

            return d.promise;
        };

        ctrl.resetViewer = function(){
            if(ctrl.formViewer.reset){
                ctrl.formViewer.reset();
            }

        };

        ctrl.resetBuilder= function(){
            if(ctrl.formBuilder.reset){
                ctrl.formBuilder.reset();
            }
        };

        ctrl.changeLanguage = function (languageKey) {
            $translate.use(languageKey);
        };

        ctrl.getMerged=function(){
            return mwFormResponseUtils.mergeFormWithResponse(ctrl.formData, ctrl.responseData);
        };

        ctrl.getQuestionWithResponseList=function(){
            return mwFormResponseUtils.getQuestionWithResponseList(ctrl.formData, ctrl.responseData);
        };
        ctrl.getResponseSheetRow=function(){
            return mwFormResponseUtils.getResponseSheetRow(ctrl.formData, ctrl.responseData);
        };
        ctrl.getResponseSheetHeaders=function(){
            return mwFormResponseUtils.getResponseSheetHeaders(ctrl.formData, ctrl.headersWithQuestionNumber);
        };

        ctrl.getResponseSheet=function(){
            return mwFormResponseUtils.getResponseSheet(ctrl.formData, ctrl.responseData, ctrl.headersWithQuestionNumber);
        };

        $scope.dismissEdit = function() {
          $scope.editingSurvey = undefined;
          $scope.surveyJSON = undefined;
        };

        $scope.createSurvey = function() {
          ctrl.formData = null;

        };

        $scope.viewSurvey = function(survey) {
          $scope.currentSurvey = survey
          $state.go('admin.show_survey', {survey_id: survey.id})
        };


    SurveysService.all(true).then(function(data) {
      $scope.surveys = data;
    });

    $scope.showSurvey = function(survey) {
      $scope.editingSurvey = true;
      SurveyItemsService.find(survey.id).then(function(items) {
        var surveyJSON = {survey: survey, groups: []};
        if (!items) { $scope.surveyJSON = surveyJSON; }
        else {
          surveyJSON.survey.version_id = items.version_id;
          surveyJSON.survey.status = items.status;
          surveyJSON.survey.algorithm = items.algorithm;
          surveyJSON.groups = items.groups || [];
          $scope.surveyJSON = surveyJSON;
        }
      });
    };

    $scope.newSurvey = function() {
      $scope.surveyJSON = {survey:
                            {name: "",
                             est_completion_time_minutes: 20,
                             is_featured:false,
                             position: null,
                             is_listed:true,
                             status: "In progress",
                             algorithm: "average",
                            },
                           groups: []
                         };
      $scope.editingSurvey = true;
    }

    $scope.dismissEdit = function() {
      $scope.editingSurvey = undefined;
      $scope.surveyJSON = undefined;
    };

    $scope.createSurvey = function() {

      $state.go('admin.new_survey')
    };




    $scope.deleteSurvey = function(survey) {
      ModalService.showModal({
        templateUrl: "/partials/admin/delete_survey_modal.html",
        controller: "ModalController",
      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          if (result === "DELETE") {
            // TODO: Is this a good idea?  Would we ever want to do this?
            //AdminService.deleteServey(survey.id).then(function() {
            $scope.surveys = $scope.surveys.filter(function(s) {
              return s.id !== survey.id;
            });
            //});
          }
        });
      });
    };
}]);


/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */

app.controller('FeaturedSurveysController', ["$scope", "SurveysService", "AdminService",
  function ($scope, SurveysService, AdminService) {
    $scope.view = {};
    var MAX_FEATURED_SURVEYS = 8;

    SurveysService.all().then(function(data) {
      $scope.view.surveys = data;
    });

    function sortedFeaturedSurveys() {
      return $scope.view.surveys.reduce(function(acc, s) {
      if (s.is_featured) acc.push(s);
        return acc;
      }, []).sort(function(a, b) {
        return Number(a.position) - Number(b.position);
      });
    }

    $scope.surveyOrder = function(survey) {
      if (survey.is_featured && survey.position !== null) return +survey.position;
      return MAX_FEATURED_SURVEYS + 1;
    };

    $scope.toggleFeaturedSurvey = function(survey) {
      if (survey.is_featured) {
        var max = $scope.view.surveys.reduce(function(acc, s) {
          if (+s.position > acc) return +s.position;
          return acc;
        }, -Infinity);
        if (max < MAX_FEATURED_SURVEYS) {
          if (!isFinite(max)) { survey.position = 1; }
          else { survey.position = max + 1; }
        }
      } else {
        delete survey['position'];
        sortedFeaturedSurveys().forEach(function(s, index) {
          s.position = index + 1;
        });
      }
    };

    $scope.moveSurvey = function(survey, moveUp) {
      var featured = sortedFeaturedSurveys();
      if (moveUp === true && featured.length > 0 && Number(survey.position) > +featured[0].position) {
        for (var i = 0; i < featured.length; i++) {
          if (+featured[i].position === +survey.position) {
            var temp = featured[i - 1];
            featured[i-1] = featured[i];
            featured[i-1].position = featured[i-1].position - 1;
            featured[i] = temp;
            temp.position = temp.position + 1;
            break;
          }
        }
      } else if (moveUp === false && featured.length > 0 && Number(survey.position) < +featured[featured.length - 1].position) {
        for (var i = 0; i < featured.length; i++) {
          if (+featured[i].position === +survey.position) {
            var temp = featured[i + 1];
            featured[i+1] = featured[i];
            featured[i+1].position = featured[i+1].position + 1;
            featured[i] = temp;
            temp.position = temp.position - 1;
            break;
          }
        }
      }
    };

    $scope.saveSurveyOrder = function() {
      var data = {};
      data.featuredOrder = sortedFeaturedSurveys().map(function(survey) {
        return {id: survey.id, position: survey.position};
      });
      AdminService.surveys.featuredOrder(data).then(function() {
        $scope.view.messages = "Order Saved";
      }).catch(function() {
        $scope.view.error = "Order Failed To Save";
      })
    };

}]);

/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */

app.controller('SurveyController', ["$rootScope", "$scope", "$stateParams", "$location", "$state", "ModalService", "SurveysService", "SurveyItemsService", "LocalAuthService",
  function ($rootScope, $scope, $stateParams, $location, $state, ModalService, SurveysService, SurveyItemsService, LocalAuthService) {

  if ($stateParams.survey_id) {
    SurveysService.find($stateParams.survey_id).then(function (response) {
      $rootScope.survey = $scope.survey = response;
    })
  }

  $scope.showConsentModal = function(survey) {
    SurveysService.requestSurvey(survey);
    ModalService.showModal({
      templateUrl: "/partials/users/consent.html",
      controller: "SurveyController"
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
      });
    });
  }

  $scope.submitConsentForm = function () {
    var survey = SurveysService.survey;
    if($scope.consent){
      $location.path('/users/surveys/' + survey.id);
    }
  }

  $scope.dismissModal = function(result) {
    close(result, 200);
    $location.path('/')
  };

  var vm = this;
  vm.survey = {};
}]);

/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */

app.controller('ResultsController', ["$scope",  "$state", "LocalAuthService", "UsersService", function($scope, $state, LocalAuthService, UsersService){
  $scope.signup = function(){
    $state.go('signup');
  };

  $scope.isAnon = !LocalAuthService.isAuthenticated();
  UsersService.result($state.params.completion_id).then(function(result){
    if(result.survey === "Not Implemented"){
      $state.go('user.dashboard');
    }else{
      $scope.result = result;
    }
  });
}]);

/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */

app.controller('SurveyItemController', ["$rootScope", "$scope",  "$state", "$location", "SurveyItemsService", "$stateParams", "LocalAuthService",
  function ($rootScope, $scope, $state, $location, SurveyItemsService, $stateParams, LocalAuthService) {

  $scope.$watch('answers', function(obj){
    if(!obj) return;

    Object.keys(obj).forEach(function(key){
      $scope.survey.groups.forEach(function(group){
        if(group.dependent_id === key){
          group.show = group.dependent_value === obj[key];
        }
      });
    });

  }, true);

  $rootScope.$watch('survey', function(){
    if(!$rootScope.survey) return;

    SurveyItemsService.find($rootScope.survey.id).then(function(response){
      $scope.recordedTime = 0;

      setInterval(function(){
        $scope.recordedTime += 1;
      }, 1000);

      $scope.keys = Object.keys;
      $scope.answers = {};
      $scope.survey = response;
    });
  });

  $scope.submitSurvey = function(){
    SurveyItemsService.submitSurvey({recordedTime: $scope.recordedTime, survey: $scope.survey, answers: $scope.answers, userToken: LocalAuthService.getToken()}).then(function(){

      if($scope.survey.name !== "Demographics" && $scope.survey.name !== "Feedback"){
        $state.go('user.survey', {survey_id: 'Feedback'});
      }else if($scope.survey.name === "Feedback" && !LocalAuthService.completedDemographics()){
        $state.go('user.survey', {survey_id: 'Demographics'});
      }else if($scope.survey.name === "Demographics" && LocalAuthService.isAuthenticated()){
        LocalAuthService.setCompletedDemographics();
        $state.go('user.results');
      }else{
        $state.go('user.results');
      }
    });
  };
}]);

/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */

app.controller('SurveysController', ["$scope", "$state", "SurveysService", "SurveyItemsService", "ModalService", "$location", "LocalAuthService",
  function ($scope, $state, SurveysService, SurveyItemsService, ModalService, $location, LocalAuthService) {

  var surveyPromise;

  if ($state.current.name === "surveys") {
    surveyPromise = SurveysService.all();
  } else {
    surveyPromise = SurveysService.featured();
  }
  surveyPromise.then(function (response) {
    $scope.surveys = SurveyItemsService.shuffle(response);
  });

  $scope.userId = function() {
    return LocalAuthService.userId();
  }

  $scope.newSurvey = function () {
    $state.go('admin.new_survey');
  };
}]);

/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */

app.controller('AdminSelectSurveysController', ["$scope", "$state", "AdminService",  "$location", "LocalAuthService",
  function ($scope, $state, AdminService, $location, LocalAuthService) {

  $scope.view = {selected: []};

  AdminService.surveys.all().then(function (response) {
    $scope.view.surveys = response.surveys;
  });

  $scope.toggleSurvey = function(id) {
    var index = $scope.view.selected.indexOf(id);
    if (index >= 0) {
      $scope.view.selected.splice(index, 1);
    } else {
      $scope.view.selected.push(id);
    }
  };

  $scope.selectSurveys = function() {
    var url = '/admin/csv-surveys/download';
    $location.path(url).search("id", $scope.view.selected);
  };
}]);

/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */


app.controller('AdminSelectSurveyItemsController', ["$scope", "$state", "AdminService",  "$location", "LocalAuthService",
  function ($scope, $state, AdminService, $location, LocalAuthService) {
  $scope.view = {};
  $scope.view.options = [{value: "first", display: "Include first result for users"},
                         {value: "last", display: "Include last result for user"},
                        ];
  if ($location.search().id && $location.search().id.length === 1) {
    $scope.view.options.unshift({value: "all", display: "Include all user results"});
  }
  $scope.view.include = "";
  AdminService.surveys.items($location.search().id).then(function(data) {
    $scope.view.surveys = data.surveys;
    if ($scope.view.surveys && _.isArray($scope.view.surveys)) {
      $scope.view.surveys.forEach(function(survey) {
        if (_.isArray(survey.questions)) {
          survey.selectAll = false;
          survey.questions.forEach(function(question) {
            question.selected = false;
          });
        }
      });
    }
  });

  $scope.selectAll = function(survey) {
    if (survey.selectAll === true) {
      survey.questions.forEach(function(question) {
        question.selected = true;
      });
    } else {
      survey.questions.forEach(function(question) {
        question.selected = false;
      });
    }
  };

  $scope.createCSV = function() {
    var selected = {};
    $scope.view.surveys.forEach(function(survey) {
      survey.questions.forEach(function(question) {
        if (question.selected === true) {
          if (selected[survey.id] === undefined) {
            selected[survey.id] = [];
          }
          selected[survey.id].push(question.id);
        }
      });
    });
    AdminService.surveys.csv(selected, $scope.view.include);
  };
}]);

/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */

app.controller('UserDashboardController', ["$state", "$rootScope", "$scope", "UsersService", "$location", "LocalAuthService", "$stateParams", "ModalService",
  function ($state, $rootScope, $scope, UsersService, $location, LocalAuthService, $stateParams, ModalService) {

  $scope.email = LocalAuthService.email();
  $scope.username = LocalAuthService.username();

  $scope.destroyAfterConfirmation = function() {
    ModalService.showModal({
      templateUrl: "/partials/users/delete_user_modal.html",
      controller: "ModalController",
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        if (result === "DELETE") {
          UsersService.destroy().then(function(data){
            LocalAuthService.clearCredentials();
            $state.go('home');
          });
        }
      });
    });
  };

  UsersService.completedSurveys().then(function(data){
    $scope.completions = data.rows;
  });
}]);

/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */

app.controller('UserPasswordController', ["$scope", "$state", "UsersService",
  function ($scope, $state, UsersService) {
    $scope.change = function(password, new_password){
      UsersService.changePassword(password, new_password).then(function(){
        $state.go('user.dashboard');
      }).catch(function() {
        $scope.errorMessage = "Old password is invalid";
      })
    };
}]);

/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */

app.controller('UserProfileController', ["$scope", "$state", "UsersService",
  function ($scope, $state, UsersService) {
    $scope.change = function(profile){
      UsersService.changeProfile(profile).then(function(){
        return UsersService.verifyLogin();
      }).then(function(){
        $state.go('user.dashboard');
      }).catch(function() {
        $scope.errorMessage = "Password is invalid";
      })
    };
}]);

/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */

app.controller('UsersController', ["$timeout", "$state", "$rootScope", "$scope", "UsersService", "$location", "LocalAuthService", "$stateParams",
  function ($timeout, $state, $rootScope, $scope, UsersService, $location, LocalAuthService, $stateParams) {

  $scope.view = {loginInfo: {}};

  $scope.$on('login', function(){
    $scope.username = LocalAuthService.username();
  });

  $scope.dashboard = function(){
    $state.go('user.dashboard', {user_id: LocalAuthService.userId()});
  };

  $scope.signup = function() {
    UsersService.create($scope.newUser).then(function(response) {
      if (response.error) {
        $scope.errors = response.error;
        $scope.newUser = {};
        $location.path('/signup');
      } else {
        UsersService.migrate().then(function(response){
          if(response.demographics){
            LocalAuthService.setCompletedDemographics();
          }

          $state.go('home');
        });
      }
    });
  };

  $scope.logout = function () {
    UsersService.logout().finally(function() {
      $location.path("/");
    });
  };

  $scope.signin = function () {
    UsersService.signin($scope.view.loginInfo).then(function (response) {
      if(LocalAuthService.isAuthenticated()){
        $scope.view.loginInfo = {};
        if(LocalAuthService.isAdmin()){
          $location.path('/admin/surveys');
        } else {
          $state.go('home');
        }
      } else {
        throw new Error("Login Failed");
      }
    }).catch(function(error) {
      LocalAuthService.clearCredentials();
      $scope.view.loginInfo.password = "";
      $scope.errors = error.statusText || error.message || "Login Failed";
    });
  };

  $scope.show = function(user) {
    UsersService.find(user).then(function(response) {
      $location.path('admin/users')
    })
  };

  $scope.delete = function (user) {
    var success_url = 'admin/users'
    var fail_url = 'admin/users';
    UsersService.destroy(user).then(function (response) {
      return response ? $location.path(success_url) : $location.path(fail_url)
    })
  };
}]);

/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */
