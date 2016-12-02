var SurveyItem = require('../../models/survey_item');
var Survey = require('../../models/survey');
var saveSurveyItems = require('../../lib/save_survey_items');


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//
// Facebook
//

var fbOptions_1 = JSON.stringify([
  {
    text: 'Yes',
    value: 1,
    additionalTextField: false
  },
  {
    text: 'No',
    value: 2,
    additionalTextField: false
  }
])

var fbSubQuestions_1 = JSON.stringify([]);

var title_1 = "Do you have a facebook?";

//----------------------------------

var fbOptions_2 = JSON.stringify([
  {
    text: 'Never',
    value: 1,
    additionalTextField: false
  },
  {
    text: 'Less than Once a Month',
    value: 2,
    additionalTextField: false
  },
  {
    text: 'Once a Month',
    value: 3,
    additionalTextField: false
  },
  {
    text: '2-3 Times a Month',
    value: 4,
    additionalTextField: false
  },
  {
    text: 'Once a Week',
    value: 5,
    additionalTextField: false
  },
  {
    text: '2-3 Times a Week',
    value: 6,
    additionalTextField: false
  },
  {
    text: 'Every other Day',
    value: 7,
    additionalTextField: false
  },
  {
    text: 'Daily',
    value: 8,
    additionalTextField: false
  }
])

var fbSubQuestions_2 = JSON.stringify([
  {text: 'How often do you update your facebook status?'},
  {text: 'How often do you update your facebook status?'},
  {text: 'How often do you post pictures on Facebook?'},
  {text: 'How often do you share articles on Facebook?'},
  {text: 'How often do you "like" others\' posts on Facebook?'},
  {text: 'How often do you comment on others\' Facebook posts?'}
])

var title_2 = 'n/a';

//----------------------------------

var fbOptions_3 = JSON.stringify([])
var fbSubQuestions_3 = JSON.stringify([])

var title_3 = 'Approximately how many facebook friends do you have?';

// ----------------------------------------

var fbOptions_4 = JSON.stringify([])
var fbSubQuestions_4 = JSON.stringify([])

var title_4 = 'Approximately how many times do you check your Facebook per day?';

// -------------------------------------

var fbOptions_5 = JSON.stringify([])
var fbSubQuestions_5 = JSON.stringify([])

var title_5 = 'How much time (in minutes) do you spend on Facebook in a typical day?';

//
// END FACEBOOK
//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//
// Instagram
//


var instaOptions_6 = JSON.stringify([
  {
    text: 'Yes',
    value: 1,
    additionalTextField: false
  },
  {
    text: 'No',
    value: 2,
    additionalTextField: false
  }
])

var instaSubQuestions_6 = JSON.stringify([]);

var title_6 = "Do you use Instagram?";

// ---------------------------------------

var instaOptions_7 = JSON.stringify([
  {
    text: 'Never',
    value: 1,
    additionalTextField: false
  },
  {
    text: 'Less than Once a Month',
    value: 2,
    additionalTextField: false
  },
  {
    text: 'Once a Month',
    value: 3,
    additionalTextField: false
  },
  {
    text: '2-3 Times a Month',
    value: 4,
    additionalTextField: false
  },
  {
    text: 'Once a Week',
    value: 5,
    additionalTextField: false
  },
  {
    text: '2-3 Times a Week',
    value: 6,
    additionalTextField: false
  },
  {
    text: 'Every other Day',
    value: 7,
    additionalTextField: false
  },
  {
    text: 'Daily',
    value: 8,
    additionalTextField: false
  }
])

var instaSubQuestions_7 = JSON.stringify([]);

var title_7 = 'How often do you post pictures on Instagram?';

//-----------------------------------------------

var instaOptions_8 = JSON.stringify([])
var instaSubQuestions_8 = JSON.stringify([])

var title_8 = 'Approximately how many pictures have you posted on Instagram?';

// ----------------------------------------

var instaOptions_9 = JSON.stringify([])
var instaSubQuestions_9 = JSON.stringify([])

var title_9 = 'Approximately how many followers do you have on Instagram?';

// -------------------------------------

var instaOptions_10 = JSON.stringify([])
var instaSubQuestions_10 = JSON.stringify([])

var title_10 = 'Approximately how people do you follow on Instagram?';

// -------------------------------------

var instaOptions_11 = JSON.stringify([])
var instaSubQuestions_11 = JSON.stringify([])

var title_11 = 'Approximately how many times do you check your Instagram per day?';

// -------------------------------------

var instaOptions_12 = JSON.stringify([])
var instaSubQuestions_12 = JSON.stringify([])

var title_12 = 'How much time (in minutes) do you spend on Instagram per day?';

// -------------------------------------

//
// END INSTAGRAM
//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//
// Twitter
//

var twitterOptions_13 = JSON.stringify([
  {
    text: 'Yes',
    value: 1,
    additionalTextField: false
  },
  {
    text: 'No',
    value: 2,
    additionalTextField: false
  }
])

var twitterSubQuestions_13 = JSON.stringify([]);


var title_13 = "Do you have a twitter account?";

// ----------------------------------------

var twitterOptions_14 = JSON.stringify([])
var twitterSubQuestions_14 = JSON.stringify([])

var title_14 = 'Approximately how many followers do you have on twitter?';

// ----------------------------------------

var twitterOptions_15 = JSON.stringify([])
var twitterSubQuestions_15 = JSON.stringify([])

var title_15 = 'Approximately how many twitter accounts do you follow?';

// -------------------------------------

var twitterOptions_16 = JSON.stringify([
  {
    text: 'Never',
    value: 1,
    additionalTextField: false
  },
  {
    text: 'Less than Once a Month',
    value: 2,
    additionalTextField: false
  },
  {
    text: 'Once a Month',
    value: 3,
    additionalTextField: false
  },
  {
    text: '2-3 Times a Month',
    value: 4,
    additionalTextField: false
  },
  {
    text: 'Once a Week',
    value: 5,
    additionalTextField: false
  },
  {
    text: '2-3 Times a Week',
    value: 6,
    additionalTextField: false
  },
  {
    text: 'Every other Day',
    value: 7,
    additionalTextField: false
  },
  {
    text: 'Daily',
    value: 8,
    additionalTextField: false
  }
])

var twitterSubQuestions_16 = JSON.stringify([]);

var title_16 = 'How often do you "tweet"?';

//--------------------------------------

var twitterOptions_17 = JSON.stringify([])
var twitterSubQuestions_17 = JSON.stringify([])

var title_17 = 'How much time (in minutes) do you spend on Twitter in a typical day?';

//
// END TWITTER
//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//
// Email
//

var emailOptions_18 = JSON.stringify([])
var emailSubQuestions_18 = JSON.stringify([])

var title_18 = 'On average, how many emails do you SEND per day?';

// -------------------------------------

var emailOptions_19 = JSON.stringify([])
var emailSubQuestions_19 = JSON.stringify([])

var title_19 = 'On average, how many emails do you RECEIVE per day?';

// -------------------------------------

var emailOptions_20 = JSON.stringify([])
var emailSubQuestions_20 = JSON.stringify([])

var title_20 = 'How much time (in minutes) do you spend on email in a typical day?';

//
// END EMAIL
//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//
// Misc
//

var miscOptions_21 = JSON.stringify([
  {
    text: 'Never',
    value: 1,
    additionalTextField: false
  },
  {
    text: 'On occassion',
    value: 2,
    additionalTextField: false
  },
  {
    text: 'About half of the time',
    value: 3,
    additionalTextField: false
  },
  {
    text: 'Most of the time',
    value: 4,
    additionalTextField: false
  },
  {
    text: 'Always',
    value: 5,
    additionalTextField: false
  }
])

var miscSubQuestions_21 = JSON.stringify([]);

var title_21 = 'How often do you write reviews for the things you buy (Yelp, Amazon, etc)?';

// ---------------------------------------------

var miscOptions_22 = JSON.stringify([
  {
    text: 'Never',
    value: 1,
    additionalTextField: false
  },
  {
    text: 'On occassion',
    value: 2,
    additionalTextField: false
  },
  {
    text: 'About half of the time',
    value: 3,
    additionalTextField: false
  },
  {
    text: 'Most of the time',
    value: 4,
    additionalTextField: false
  },
  {
    text: 'Always',
    value: 5,
    additionalTextField: false
  }
])

var miscSubQuestions_22 = JSON.stringify([
  {text: 'How often do you and your friends converse with each other?'},
  {text: 'How often do you spend time with your friends?'}
]);

var title_22 = 'n/a';

// ---------------------------------------------

var miscOptions_23 = JSON.stringify([
  {
    text: 'Not at all',
    value: 1,
    additionalTextField: false
  },
  {
    text: 'A little bit',
    value: 2,
    additionalTextField: false
  },
  {
    text: 'Somewhat',
    value: 3,
    additionalTextField: false
  },
  {
    text: 'Fairly well',
    value: 4,
    additionalTextField: false
  },
  {
    text: 'Very well',
    value: 5,
    additionalTextField: false
  },
  {
    text: 'Extremely well',
    value: 6,
    additionalTextField: false
  },
  {
    text: 'Could not know any better',
    value: 7,
    additionalTextField: false
  }
])

var miscSubQuestions_23 = JSON.stringify([
  {text: 'How well do you feel you know your friend?'},
  {text: 'How well do you feel your friend knows you?'}
]);

var title_23 = 'For the following questions, think of the friend you interact with most:';

// ----------------------------------------

var miscOptions_24 = JSON.stringify([
  {
    text: 'I don\'t know this person well enough to decide',
    value: 1,
    additionalTextField: false
  },
  {
    text: 'I don\'t trust this person',
    value: 2,
    additionalTextField: false
  },
  {
    text: 'I trust this person somewhat',
    value: 3,
    additionalTextField: false
  },
  {
    text: 'I generally trust this person',
    value: 4,
    additionalTextField: false
  },
  {
    text: 'I highly trust this person',
    value: 5,
    additionalTextField: false
  },
  {
    text: 'I would trust this person with my life',
    value: 6,
    additionalTextField: false
  }
])

var miscSubQuestions_24 = JSON.stringify([]);

var title_24 = 'How much do you trust your friend?';

// ----------------------------------

var miscOptions_25 = JSON.stringify([
  {
    text: 'I don\'t know this person well enough to decide',
    value: 1,
    additionalTextField: false
  },
  {
    text: 'my friend doesn\'t trust me',
    value: 2,
    additionalTextField: false
  },
  {
    text: 'my friend trusts me somewhat',
    value: 3,
    additionalTextField: false
  },
  {
    text: 'my friend generally trusts me',
    value: 4,
    additionalTextField: false
  },
  {
    text: 'my friend highly trusts me',
    value: 5,
    additionalTextField: false
  },
  {
    text: 'my friend trusts me with his/her life',
    value: 6,
    additionalTextField: false
  }
])

var miscSubQuestions_25 = JSON.stringify([]);

var title_25 = 'How much does your friend trust you?';

//
//
// END Misc
//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



var returnPromise = true;
var realWorldSharingPromises = [];
var survey_id;

new Survey({name: "Real World Sharing"}).fetch()
  .then(function(model) {
  survey_id = model.get('id');
  return new SurveyItem({
    survey_id: survey_id,
    strategy: "n/a",
    item_type: "multiple_choice",
    title: title_1,
    layout: "multiple_choice",
    position: 1,
    options: fbOptions_1,
    sub_questions: fbSubQuestions_1
  }).save();
}).then(function(model) {
  var itemId = model.get('id');
  var fbSurveyItems = [
    {
      survey_id: survey_id,
      strategy: "n/a",
      item_type: "multiple_choice",
      title: title_2,
      layout: "table",
      position: 2,
      options: fbOptions_2,
      sub_questions: fbSubQuestions_2,
      depends_on: {id: itemId, value: 1}
    },
    {
      survey_id: survey_id, 
      strategy: "n/a",
      item_type: "numeric_input",
      title: title_3,
      layout: "free_form",
      position: 3,
      options: fbOptions_3,
      sub_questions: fbSubQuestions_3,
      depends_on: {id: itemId, value: 1}
    },
    {
      survey_id: survey_id,
      strategy: "n/a",
      item_type: "numeric_input",
      title: title_4,
      layout: "free_form",
      position: 4,
      options: fbOptions_4,
      sub_questions: fbSubQuestions_4,
      depends_on: {id: itemId, value: 1}
    },
    {
      survey_id: survey_id,
      strategy: "n/a",
      item_type: "numeric_input",
      title: title_5,
      layout: "free_form",
      position: 5,
      options: fbOptions_5,
      sub_questions: fbSubQuestions_5,
      depends_on: {id: itemId, value: 1}
    }
  ];

  return saveSurveyItems(fbSurveyItems, returnPromise);

}).then(function() {
  return new SurveyItem({
    survey_id: survey_id,
    strategy: "n/a",
    item_type: "multiple_choice",
    title: title_6,
    layout: "multiple_choice",
    position: 6,
    options: instaOptions_6,
    sub_questions: instaSubQuestions_6
  }).save();
}).then(function(model) {
  var itemId = model.get('id');
  var instaSurveyItems = [
    {
      survey_id: survey_id,
      strategy: "n/a",
      item_type: "multiple_choice",
      title: title_7,
      layout: "multiple_choice",
      position: 7,
      options: instaOptions_7,
      sub_questions: instaSubQuestions_7,
      depends_on: {id: itemId, value: 1}
    },
    {
      survey_id: survey_id,
      strategy: "n/a",
      item_type: "numeric_input",
      title: title_8,
      layout: "free_form",
      position: 8,
      options: instaOptions_8,
      sub_questions: instaSubQuestions_8,
      depends_on: {id: itemId, value: 1}
    },
    {
      survey_id: survey_id,
      strategy: "n/a",
      item_type: "numeric_input",
      title: title_9,
      layout: "free_form",
      position: 9,
      options: instaOptions_9,
      sub_questions: instaSubQuestions_9,
      depends_on: {id: itemId, value: 1}
    },
    {
      survey_id: survey_id,
      strategy: "n/a",
      item_type: "numeric_input",
      title: title_10,
      layout: "free_form",
      position: 10,
      options: instaOptions_10,
      sub_questions: instaSubQuestions_10,
      depends_on: {id: itemId, value: 1}
    },
    {
      survey_id: survey_id,
      strategy: "n/a",
      item_type: "numeric_input",
      title: title_11,
      layout: "free_form",
      position: 11,
      options: instaOptions_11,
      sub_questions: instaSubQuestions_11,
      depends_on: {id: itemId, value: 1}
    },
    {
      survey_id: survey_id,
      strategy: "n/a",
      item_type: "numeric_input",
      title: title_12,
      layout: "free_form",
      position: 12,
      options: instaOptions_12,
      sub_questions: instaSubQuestions_12,
      depends_on: {id: itemId, value: 1}
    }
  ];

  return saveSurveyItems(instaSurveyItems, returnPromise);
}).then(function() {
  return new SurveyItem({
    survey_id: survey_id,
    strategy: "n/a",
    item_type: "multiple_choice",
    title: title_13,
    layout: "multiple_choice",
    position: 13,
    options: twitterOptions_13,
    sub_questions: twitterSubQuestions_13
  }).save();
}).then(function(model) {
  var itemId = model.get('id');
  var twitterSurveyItems = [
    {
      survey_id: survey_id,
      strategy: "n/a",
      item_type: "numeric_input",
      title: title_14,
      layout: "free_form",
      position: 14,
      options: twitterOptions_14,
      sub_questions: twitterSubQuestions_14,
      depends_on: {id: itemId, value: 1}
    },
    {
      survey_id: survey_id,
      strategy: "n/a",
      item_type: "numeric_input",
      title: title_15,
      layout: "free_form",
      position: 15,
      options: twitterOptions_15,
      sub_questions: twitterSubQuestions_15,
      depends_on: {id: itemId, value: 1}
    },
    {
      survey_id: survey_id,
      strategy: "n/a",
      item_type: "multiple_choice",
      title: title_16,
      layout: "multiple_choice",
      position: 16,
      options: twitterOptions_16,
      sub_questions: twitterSubQuestions_16,
      depends_on: {id: itemId, value: 1}
    },
    {
      survey_id: survey_id,
      strategy: "n/a",
      item_type: "numeric_input",
      title: title_17,
      layout: "free_form",
      position: 17,
      options: twitterOptions_17,
      sub_questions: twitterSubQuestions_17,
      depends_on: {id: itemId, value: 1}
    }
  ];

  return saveSurveyItems(twitterSurveyItems, returnPromise);
}).then(function() {
  var emailSurveyItems = [
    {
      survey_id: survey_id,
      strategy: "n/a",
      item_type: "numeric_input",
      title: title_18,
      layout: "free_form",
      position: 18,
      options: emailOptions_18,
      sub_questions: emailSubQuestions_18
    },
    {
      survey_id: survey_id,
      strategy: "n/a",
      item_type: "numeric_input",
      title: title_19,
      layout: "free_form",
      position: 19,
      options: emailOptions_19,
      sub_questions: emailSubQuestions_19
    },
    {
      survey_id: survey_id,
      strategy: "n/a",
      item_type: "numeric_input",
      title: title_20,
      layout: "free_form",
      position: 20  ,
      options: emailOptions_20,
      sub_questions: emailSubQuestions_20
    }
  ];

  return saveSurveyItems(emailSurveyItems, returnPromise);
}).then(function() {
  var miscSurveyItems = [
    {
      survey_id: survey_id,
      strategy: "n/a",
      item_type: "multiple_choice",
      title: title_21,
      layout: "multiple_choice",
      position: 21,
      options: miscOptions_21,
      sub_questions: miscSubQuestions_21
    },
    {
      survey_id: survey_id,
      strategy: "n/a",
      item_type: "multiple_choice",
      title: title_22,
      layout: "table",
      position: 22,
      options: miscOptions_22,
      sub_questions: miscSubQuestions_22
    },
    {
      survey_id: survey_id,
      strategy: "n/a",
      item_type: "multiple_choice",
      title: title_23,
      layout: "table",
      position: 23,
      options: miscOptions_23,
      sub_questions: miscSubQuestions_23
    },
    {
      survey_id: survey_id,
      strategy: "n/a",
      item_type: "multiple_choice",
      title: title_24,
      layout: "multiple_choice",
      position: 24,
      options: miscOptions_24,
      sub_questions: miscSubQuestions_24
    },
    {
      survey_id: survey_id,
      strategy: "n/a",
      item_type: "multiple_choice",
      title: title_25,
      layout: "multiple_choice",
      position: 25,
      options: miscOptions_25,
      sub_questions: miscSubQuestions_25
    }
  ];

  saveSurveyItems(miscSurveyItems);
});