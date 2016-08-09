var Survey = require('../../models/survey');
var saveSurveyItems = require('../../lib/save_survey_items');

var options_1 = JSON.stringify([
  {
    text: "Male",
    value: 1,
    additionalTextField: false
  },
  {
    text: "Female",
    value: 2,
    additionalTextField: false
  },
  {
    text: "Other",
    value: 3,
    additionalTextField: false
  }
]);

var subQuestions_1 = JSON.stringify([]);

var title_1 = "What is your gender?";

// ------------------------------------------

var options_2 = JSON.stringify([]);

var subQuestions_2 = JSON.stringify([]);

var title_2 = "What is your age?";

// ------------------------------------------

var options_3 = JSON.stringify([
  {
    text: "Black or African American",
    value: 1,
    additionalTextField: false
  },
  {
    text: "White or European American",
    value: 2,
    additionalTextField: false
  },
  {
    text: "Native American",
    value: 3,
    additionalTextField: false
  },
  {
    text: "Asian/Pacific Islander",
    value: 4,
    additionalTextField: false
  },
  {
    text: "Hispanic/Latino",
    value: 5,
    additionalTextField: false
  },
  {
    text: "Other/Unknown",
    value: 6,
    additionalTextField: true
  }
]);

var subQuestions_3 = JSON.stringify([]);

var title_3 = "What is your race/ethnicity?";

// --------------------------------------------------

var options_4 = JSON.stringify([]);

var subQuestions_4 = JSON.stringify([]);

var title_4 = "What is your primary language (language spoken at home)?";

// --------------------------------------------------

var options_5 = JSON.stringify([]);

var subQuestions_5 = JSON.stringify([]);

var title_5 = "What is the zipcode of your hometown?";

// ---------------------------------------------------

var options_6 = JSON.stringify([
  {
    text: "Upper Class",
    value: 1,
    additionalTextField: false
  },
  {
    text: "Upper Middle Class",
    value: 2,
    additionalTextField: false
  },
  {
    text: "Middle Class",
    value: 3,
    additionalTextField: false
  },
  {
    text: "Lower Middle Class",
    value: 4,
    additionalTextField: false
  },
  {
    text: "Lower Class ",
    value: 5,
    additionalTextField: false
  }
]);

var subQuestions_6 = JSON.stringify([]);

var title_6 = "Which of the following best describes your family's socioeconomic status?";


var survey_items = [];
new Survey({name: "Demographics"}).fetch()
  .then(function(model) {
  var id = model.get('id');
  survey_items = [
    {
      survey_id: id,
      strategy: "n/a",
      item_type: "multiple_choice",
      title: title_1,
      layout: "free_form",
      position: 1,
      options: options_1,
      sub_questions: subQuestions_1
    },
    {
      survey_id: id,
      strategy: "n/a",
      item_type: "numeric_input",
      title: title_2,
      layout: "free_form",
      position: 2,
      options: options_2,
      sub_questions: subQuestions_2
    },
    {
      survey_id: id,
      strategy: "n/a",
      item_type: "multiple_choice",
      title: title_3,
      layout: "free_form",
      position: 3,
      options: options_3,
      sub_questions: subQuestions_3
    },
    {
      survey_id: id,
      strategy: "n/a",
      item_type: "text_input",
      title: title_4,
      layout: "free_form",
      position: 4,
      options: options_4,
      sub_questions: subQuestions_4
    },
    {
      survey_id: id,
      strategy: "n/a",
      item_type: "numeric_input",
      title: title_5,
      layout: "free_form",
      position: 5,
      options: options_5,
      sub_questions: subQuestions_5
    },
    {
      survey_id: id,
      strategy: "n/a",
      item_type: "multiple_choice",
      title: title_6,
      layout: "free_form",
      position: 6,
      options: options_6,
      sub_questions: subQuestions_6
    }
  ];
}).then(function() {
  saveSurveyItems(survey_items);
});
