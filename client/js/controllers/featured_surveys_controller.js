app.controller("FeaturedSurveysController", [
  "$scope",
  "SurveysService",
  "AdminService",
  function($scope, SurveysService, AdminService) {
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
      if (survey.is_featured && survey.position != null) {
	return survey.position;
      }
      return MAX_FEATURED_SURVEYS + 1;
    };

    $scope.toggleFeaturedSurvey = function(survey) {
      if (survey.is_featured) {
	var max = $scope.view.surveys.reduce(function(acc, s) {
	  if (s.position > acc) return s.position;
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
      if (moveUp && featured.length > 0 &&
	  Number(survey.position) > featured[0].position) {
	for (var i = 0; i < featured.length; i++) {
	  if (featured[i].position == survey.position) {
	    var temp = featured[i - 1];
	    featured[i-1] = featured[i];
	    featured[i-1].position = featured[i-1].position - 1;
	    featured[i] = temp;
	    temp.position = temp.position + 1;
	    break;
	  }
	}
      } else if (!moveUp &&
		 featured.length > 0 &&
		 Number(survey.position) < featured[featured.length - 1].position) {
	for (var i = 0; i < featured.length; i++) {
	  if (featured[i].position == survey.position) {
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
      });
    };
  }
]);
