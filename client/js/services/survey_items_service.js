app.factory('SurveyItemsService', [
  "$http",
  function($http) {

    var url = '/api/v1';
    return {
      submitSurvey: function(results){
	return $http.post(url + '/survey-items', results);
      },
      find: function(id){
	return $http.get(url + '/survey-items/' + id)
	  .then(function (response) {
	    return response.data;
	  });
      },
      getScore: function(results) {
	if(results.length === 0){
	  return 0;
	} else {
	  var _this = this;
	  var answers = results.map(function(num) {
	    if (typeof(num) === 'object') {
	      num = _this.getSubScore(num);
	    }
	    return Number(num);
	  });
	  answers = answers.filter(function(answer) {
	    var nan = isNaN(answer);
	    return !nan;
	  });
	  return answers.reduce(function(sum, num) {
	    return sum + num;
	  });
	}
      },
      getDependent: function (itemsArray, id) {
	var dependent;
	itemsArray.forEach(function (item, i) {
	  if(item.id === id) {
	    dependent = i;
	  }
	});
	return dependent;
      },
      getSubScore: function(answers) {
	if(answers.length === 0){
	  return 0;
	} else {
	  return answers.reduce(function (sum, num) {
	    return sum + num;
	  });
	}
      },
      sortItemsByPosition: function (items) {
	return items.sort(function (item1, item2) {
	  return item1.position - item2.position;
	});
      },
      shuffle: function (items) {
	for(var i=items.length-1; i>=0; i--){
	  var randomIndex = Math.floor(Math.random()*(i+1));
	  var itemAtIndex = items[randomIndex];
	  items[randomIndex] = items[i];
	  items[i] = itemAtIndex;
	}
	return items;
      },
      hasUnansweredQuestions: function (answers, questions) {
	var emptySubQuestions = 0;
	var emptyQuestions = answers.length < questions;
	answers.forEach(function (answer) {
	  if(typeof(answer) === 'object' && answer.length === 0){
	    emptySubQuestions += 1;
	  }
	});
	if (emptyQuestions || emptySubQuestions > 0) {
	  return true;
	}
	return false;
      }
    };
  }
]);
