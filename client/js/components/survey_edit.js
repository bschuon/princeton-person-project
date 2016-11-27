app.directive('surveyEdit', [
  function() {
    var controller = [
      '$scope',
      function($scope) {
	function randomQuestionId(length) {
	  var vals = 'abcdefghijklmnopqrstuvwxyz1234567890-$#'.split('');
	  var randomStr = [];
	  for (var i = 0; i < length; i++) {
            var index = Math.floor(Math.random() * vals.length);
            randomStr.push(vals[index]);
	  }
	  return randomStr.join('');
	}

	$scope.groupTypes = [
	  {name: 'table', id: 'table'},
          {name: 'numeric', id: 'number'},
          {name: 'radio button', id: 'radio'},
          {name: 'radio with text', id: 'radio_text'},
          {name: 'text', id: 'text'}
        ];

	$scope.addTableQuestion = function(fields, group) {
	  group.questions.push({
	    fields: fields,
	    data: {
	      question_id: randomQuestionId(8),
              position: null,
              text: ""
            }
          });
	};

	$scope.addTableColumn = function(fields, group) {
	  var newField = {
            field_id: randomQuestionId(8),
            value: -1,
            position: -1,
            text: "",
            widget: "radio"
	  };
	  fields.forEach(function(f) {
            newField.value = f.value > newField.value ? f.value : newField.value;
            newField.position = f.position > newField.position ? f.position : newField.position;
	  });

	  newField.value++;
	  newField.position++;

	  fields.push(newField);
	};

	$scope.removeTableQuestion = function(group, question) {
	  group.questions = group.questions.filter(function(q) {
            return q !== question;
	  });
	};

	$scope.removeTableColumn = function(fields, field, group) {
	  for (var i = fields.length - 1; i >= 0; i--) {
            if (fields[i].field_id === field.field_id) {
              fields.splice(i, 1);
            }
	  }

	  group.questions.forEach(function(q) {
            q.fields = q.fields.filter(function(f) {
              return f.field_id !== field.field_id;
            });
	  });
	};

	$scope.addRadioOption = function(question) {
	  var greatestValue = question.fields.reduce(function(acc, field) {
            return field.value > acc ? field.value : acc;
	  }, 1);


	  var greatestPosition = question.fields.reduce(function(acc, field) {
            return field.position > acc ? field.position : acc;
	  }, 1);
	  var newField = {
            field_id: randomQuestionId(8),
            value: greatestValue + 1,
            position: greatestPosition + 1,
            text: "",
            widget: "radio"
	  };

	  question.fields.push(newField);
	};

	$scope.singleQuestionType = function(group) {
	  if (!group || !group.questions || group.questions.length > 1) {
            return false;
	  }

	  if (group.questions.length === 0 ||
              !group.questions[0].fields ||
              group.questions[0].fields.length === 0) {
            return false;
	  }
	  var widgetType = group.questions[0].fields[0].widget;
	  if (widgetType === "number" ||
              widgetType === "text") {
            return true;
	  }

	  return false;
	};

	$scope.removeRadio = function(question, field) {
	  question.fields = question.fields.filter(function(f) {
            return f.field_id !== field.field_id;
	  });
	};

	$scope.removeQuestionGroup = function(group) {
	  $scope.survey.groups = $scope.survey.groups.filter(function(g) {
            return g !== group;
	  });
	};

	$scope.addQuestionGroup = function(newGroupId) {
	  var maxNumberInGroup = $scope.survey.groups.reduce(function(acc, g) {
            return g.number > acc ? g.number : acc;
	  }, 0);

	  var groupType = (newGroupId === 'table' ? 'table' : null);
	  var widgetType = (newGroupId === 'table' ? 'radio' : newGroupId);

	  var newGroup = {
	    number: maxNumberInGroup + 1,
	    type: groupType,
	    title: null,
	    master_id: null,
	    dependent_id: null,
	    dependent_value: null,
	    show: true,
	    questions: [
	      {
                fields: [
		  {
                    field_id: randomQuestionId(11),
                    value: 1,
                    position: 1,
                    text: null,
                    widget: widgetType
                  }
		],
                data: {
                  question_id: randomQuestionId(11),
                  text: "Question 1",
                  position: null
                }
	      }
	    ]
	  };
	  $scope.survey.groups.push(newGroup);
	};
      }
	  ];

    return {
      scope: {
	survey: "=",
	close: "&"
      },
      controller: controller,
      templateUrl: "partials/admin/survey_edit.html"
    };
  }
	  ]);
