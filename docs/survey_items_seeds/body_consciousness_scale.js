var SurveyItem = require('../../models/survey_item');
var Survey = require('../../models/survey');
var saveSurveyItems = require('../../lib/save_survey_items');

var options_1 = JSON.stringify([
  {
    text: "extremely uncharacteristic",
    value: 1,
  },
  {
    text: "",
    value: 2,
  },
  {
    text: "",
    value: 3,
  },
  {
    text: "",
    value: 4,
  },
  {
    text: "extremely characteristic",
    value: 5,
  }
])

var subQuestions_1 = JSON.stringify([
  {
    text: "I'm sensitive to internal bodily tensions."
  },
  {
    text: "I know immediately when my mouth or throat gets dry."
  },
  {
    text: "I can often feel my heart beating."
  },
  {
    text: "I am quick to sense the hunger contractions of my stomach."
  },
  {
    text: "I'm very aware of changes in my body temperature."
  }
])

var survey_item = {};
new Survey({name: "Body Consciousness Scale"}).fetch()
  .then(function(model) {
  var id = model.get('id');
  survey_item =  {
    survey_id: id,
    strategy: "n/a",
    item_type: "multiple_choice",
    title: "n/a",
    layout: "table",
    position: 1,
    options: options_1,
    sub_questions: subQuestions_1
  };
}).then(function() {
  saveSurveyItems([survey_item]);
});
