var SurveyItem = require('../../models/survey_item');
var Survey = require('../../models/survey');
var saveSurveyItems = require('../../lib/save_survey_items');

var options_1 = JSON.stringify([]);

var subQuestions_1 = JSON.stringify([]);

var title_1 = "About how many people in your life would you consider a friend?";

// -----------------------------------------------

var options_2 = JSON.stringify([]);

var subQuestions_2 = JSON.stringify([]);

var title_2 = "About how many CLOSE friends and relatives do you have (people you feel at ease with and can talk to about what is on your mind)? Write in the number of close friends and close relatives:";

// ------------------------------------------------
var options_3 = JSON.stringify([
  {
    text: "1 - None of the time",
    value: 1,
    additionalTextField: false
  },
  {
    text: "2 - A little of the time",
    value: 2,
    additionalTextField: false
  },
  {
    text: "3 - Some of the time",
    value: 3,
    additionalTextField: false
  },
  {
    text: "4 - Most of the time",
    value: 4,
    additionalTextField: false
  },
  {
    text: "5 - All of the time",
    value: 5,
    additionalTextField: false
  }
])

var subQuestions_3 = JSON.stringify([
  {
    text: "Someone to help you if you were confined to bed"
  },
  {
    text: "Someone you can count on to listen to you when you need to talk"
  },
  {
    text: "Someone to give you good advice about a crisis"
  },
  {
    text: "Someone to take you to the doctor if you needed it"
  },
  {
    text: "Someone who shows you love and affection"
  },
  {
    text: "Someone to have a good time with"
  },
  {
    text: "Someone to give you information to help you understand a situation"
  },
  {
    text: "Someone to confide in or talk to about yourself or your problems"
  },
  {
    text: "Someone who hugs you"
  },
  {
    text: "Someone to get together with for relaxation"
  },
  {
    text: "Someone to prepare your meals if you were unable to do it yourself"
  },
  {
    text: "Someone whose advice you really want"
  },
  {
    text: "Someone to do things with to help get your mind off things"
  },
  {
    text: "Someone to help with daily chores if you were sick"
  },
  {
    text: "Someone to share your most private worries and fears with"
  },
  {
    text: "Someone to turn to for suggestions about how to deal with a personal problem"
  },
  {
    text: "Someone to do something enjoyable with"
  },
  {
    text: "Someone who understands your problems"
  },
  {
    text: "Someone to love and make you feel wanted"
  }
])

var title_3 = "People sometimes look to others for companionship, assistance, or other types of support. How often is each of the following kinds of support available to YOU if you need it?"

// -------------------------------------
var survey_items = [];

new Survey({name: "MOS Social Support"}).fetch()
  .then(function(model) {
  var id = model.get('id');
  survey_items = [
    {
      survey_id: id,
      strategy: "n/a",
      item_type: "numeric_input",
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
     layout: "table",
     position: 3,
     options: options_3,
     sub_questions: subQuestions_3
    }
  ];
}).then(function() {
  saveSurveyItems(survey_items);
});
