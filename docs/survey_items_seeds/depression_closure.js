var SurveyItem = require('../../models/survey_item');
var Survey = require('../../models/survey');
var saveSurveyItems = require('../../lib/save_survey_items');

var options_1 = JSON.stringify([
  {
    text: "Less than 1 day: Rarely",
    value: 1,
    additionalTextField: false
  },
  {
    text: "1-2 days: Some or a little of the time",
    value: 2,
    additionalTextField: false
  },
  {
    text: "3-4 days: Occasionally or a moderate amount of the time",
    value: 3,
    additionalTextField: false
  },
  {
    text: "5-7 days: Most or all of the time",
    value: 4,
    additionalTextField: false
  }
])

var subQuestions_1 = JSON.stringify([
  {
    text: "I was bothered by things that usually don't bother me."
  },
  {
    text: " I didn't feel like eating; I had a poor appetite."
  },
  {
    text: ". I felt that I could not shake off the blues even with help from my family or friends."
  },
  {
    text: "I had trouble keeping my mind on what I was doing."
  },
  {
    text: "I felt depressed."
  },
  {
    text: "I felt like everything I did was an effort."
  },
  {
    text: "I thought that my life until now had been a failure."
  },
  {
    text: "I felt afraid."
  },
  {
    text: "I couldn't sleep well."
  },
  {
    text: "I was happy."
  },
  {
    text: "I talked less than usual."
  },
  {
    text: "I felt lonely."
  },
  {
    text: "People were unfriendly."
  },
  {
    text: "I enjoyed life."
  },
  {
    text: "I had crying spells."
  },
  {
    text: "I felt that people disliked me."
  },
  {
    text: "I couldn't get going."
  },
  {
    text: "I felt that I was just as good as other people."
  },
  {
    text: "I felt hopeful about the future."
  },
  {
    text: "I felt sad."
  }
])

//------------------------------------------------------------
var options_2 = JSON.stringify([
  {
    text: "Strongly Disagree",
    value: 1,
    additionalTextField: false
  },
  {
    text: "Moderately Disagree",
    value: 2,
    additionalTextField: false
  },
  {
    text: "Slightly Disagree",
    value: 3,
    additionalTextField: false
  },
  {
    text: "Slightly Agree",
    value: 4,
    additionalTextField: false
  },
  {
    text: "Moderately Agree",
    value: 5,
    additionalTextField: false
  },
  {
    text: "Strongly Agree",
    value: 6,
    additionalTextField: false
  }
])

var subQuestions_2 = JSON.stringify([
  {
    text: "I don't like situations that are uncertain."
  },
  {
    text: "I feel uncomfortable when I don't understand the reason why an event occurred in my life."
  },
  {
    text: "When I am confused about an important issue, I feel very upset."
  },
  {
    text: "In most social conflicts, I can easily see which side is right and which is."
  },
  {
    text: "I like to know what people are thinking all the time."
  },
  {
    text: "I like to know what people are thinking all the time."
  },
  {
    text: "I dislike it when a person's statement could mean many different things."
  },
  {
    text: "It's annoying to listen to someone who cannot seem to make up his or her mind."
  },
  {
    text: "I feel uncomfortable when someone's meaning or intention is unclear to me."
  },
  {
    text: "I'd rather know bad news than stay in a state of uncertainty."
  }
])

survey_items = [];
Promise.all([
  new Survey({name: "Depression"}).fetch().then(function(model) {
    survey_items.push({
      survey_id: model.get('id'),
      strategy: "n/a",
      item_type: "multiple_choice",
      title: "n/a",
      layout: "table",
      position: 1,
      options: options_1,
      sub_questions: subQuestions_1
    });
  }),
  new Survey({name: "Need For Closure"}).fetch().then(function(model) {
    survey_items.push({
      survey_id: model.get('id'),
      strategy: "n/a",
      item_type: "multiple_choice",
      title: "n/a",
      layout: "table",
      position: 1,
      options: options_2,
      sub_questions: subQuestions_2
    });
  })
]).then(function() {
  saveSurveyItems(survey_items);
}).catch(function(data) {
  console.log("There was an error", data);
});
