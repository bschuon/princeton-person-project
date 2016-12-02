var SurveyItem = require('../../models/survey_item');
var Survey = require('../../models/survey');
var saveSurveyItems = require('../../lib/save_survey_items');

var options_1 = JSON.stringify([
  {
    text: 'Because larger caves produce audible echoes.',
    value: 1,
    additionalTextField: false
  },
  {
    text: 'Because that\’s the way Sally wanted them.',
    value: 2,
    additionalTextField: false
  },
  {
    text: 'Because Sally enlarged them.',
    value: 3,
    additionalTextField: false
  },
  {
    text: 'Because tourists go site seeing.',
    value: 4,
    additionalTextField: false
  },
  {
    text: 'Because Sally dislikes sandwiches.',
    value: 5,
    additionalTextField: false
  }
])

var subQuestions_1 = JSON.stringify([])

var title_1 = "Sally owns a canyon park that attracts tourists who come to have picnics in the many caves. The best caves are those that are large enough to produce an audible echo, so tourists tend to prefer these. Sally does not realize that these are popular because of the echo, but she does notice that larger caves are everyone’s favorites. As a result she decides to enlarge all the caves. Why are Sally's caves large?"

// -------------------------------------

var options_2 = JSON.stringify([
  {
    text: "Because larger dishes are more sensitive.",
    value: 1,
    additionalTextField: false
  },{
    text: "Because that’s the way Zoe wanted them.",
    value: 2,
    additionalTextField: false
  },
  {
    text: "Because Zoe made them from large quantities of metal.",
    value: 3,
    additionalTextField: false
  },
  {
    text: "Because technology is useful.",
    value: 4,
    additionalTextField: false
  },
  {
    text: "Because Zoe likes plastic.",
    value: 5,
    additionalTextField: false
  }
]);

var subQuestions_2 = JSON.stringify([]);

var title_2 = "Zoe is an engineer designing satellite dishes. The best-selling dishes are the largest ones, because they are the most sensitive. Although Zoe doesn’t realize that the large ones sell better because of their sensitivity, she decides to make all of her dishes large to meet demand. As a result she makes her dishes with large quantities of metal, yielding a large dish size. Why are Zoe's satellite dishes large?"

// ----------------------------------

var options_3 = JSON.stringify([
  {
    text: "Because cats with larger ears catch mice more effectively.",
    value: 1,
    additionalTextField: false
  },
  {
    text: "Because that’s the way Diana wanted them.",
    value: 2,
    additionalTextField: false
  },
  {
    text: "Because Diana genetically modified them to be that size.",
    value: 3,
    additionalTextField: false
  },
  {
    text: "Because mice have whiskers.",
    value: 4,
    additionalTextField: false
  },
  {
    text: "Because Diana likes dogs.",
    value: 5,
    additionalTextField: false
  }
])

var subQuestions_3 = JSON.stringify([]);

var title_3 = "Diana is a genetic engineer who creates cats as household pets. Many of her clients buy cats in order to catch mice in their homes, so they tend to prefer the cats who have large ears, and hence hear and catch mice more effectively. Diana doesn’t realize that large ears are popular because they help the cats catch mice, but she does  notice that large ears are the common favorite. As a result she decides to genetically engineer only cats with large ears. Why do Diana's cats have large ears?"

// ---------------------------------------------------------

var options_4 = JSON.stringify([
  {
    text: "Because the pointy end damages weed roots.",
    value: 1,
    additionalTextField: false
  },
  {
    text: "Because that’s the way Fred wanted them.",
    value: 2,
    additionalTextField: false
  },
  {
    text: "Because Fred sharpened the tips of the spades.",
    value: 3,
    additionalTextField: false
  },
  {
    text: "Because weeding eliminates weeds.",
    value: 4,
    additionalTextField: false
  },
  {
    text: "Because Fred doesn’t like vegetables.",
    value: 5,
    additionalTextField: false
  }
])

var subQuestions_4 = JSON.stringify([]);

var title_4 = "Fred is a gardener who sells spades with tips that he modifies into all sorts of shapes. His most tools are the spades with the pointiest tips, because they destroy the roots of weeds as they dig. Fred doesn’t realize that they’re popular because the pointiness destroys weed roots, but he does notice that the pointy tools sell best. As a result, Fred decides to manufacture only pointy tools, so he sharpens the tips of spades to make them pointy. Why are Fred's tools pointy?"

// ----------------------------------------------------------

var options_5 = JSON.stringify([
  {
    text: "Because the pointy claws damage weed roots.",
    value: 1,
    additionalTextField: false
  },
  {
    text: "Because that’s the way Calvin wanted them.",
    value: 2,
    additionalTextField: false
  },
  {
    text: "Because Calvin genetically modified the gophers to be like that.",
    value: 3,
    additionalTextField: false
  },
  {
    text: "Because gophers aren’t marsupials.",
    value: 4,
    additionalTextField: false
  },
  {
    text: "Because Calvin doesn’t like vegetables.",
    value: 5,
    additionalTextField: false
  }
])

var subQuestions_5 = JSON.stringify([]);

var title_5 = "Calvin is a genetic engineer who creates plants and animals that facilitate agriculture, specializing in weed-eating gophers. His clients tend to purchase gophers with pointy claws, because they help destroy weeds not only by nibbling on them, but also by damaging the roots as they dig. Calvin doesn’t realize that pointy claws allow gophers to damage weed roots, but he does notice that the pointy claws are the most popular. As a result he decides to create all of his gophers with pointy claws. Why do Calvin's gophers have pointy claws?"

// ----------------------------------------------------------

var options_6 = JSON.stringify([
  {
    text: "Because the pointiness keeps birds off.",
    value: 1,
    additionalTextField: false
  },
  {
    text: "Because that’s the way Brent wanted them.",
    value: 2,
    additionalTextField: false
  },
  {
    text: "Because Brent broke rocks into pointy shards.",
    value: 3,
    additionalTextField: false
  },
  {
    text: "Because birds have wings.",
    value: 4,
    additionalTextField: false
  },
  {
    text: "Because Brent doesn’t like vegetables.",
    value: 5,
    additionalTextField: false
  }
])

var subQuestions_6 = JSON.stringify([]);

var title_6 = "Brent sells landscaping materials for gardens, especially rocks. Many of his clients don’t like birds perching on the rocks they buy for their gardens, so they tend to buy the pointiest rocks, as the pointiness keeps birds off. Brent doesn’t realize that the pointy rocks keep birds from perching on them, but he does notice that pointy rocks are the most popular. As a result he decides to break rocks into pointy shards and sell only pointy rocks. Why are Brent's rocks pointy?"

// ----------------------------------------------------------

var options_7 = JSON.stringify([
  {
    text: "Because it’s attention grabbing at night.",
    value: 1,
    additionalTextField: false
  },
  {
    text: "Because that’s the way Carl wanted it.",
    value: 2,
    additionalTextField: false
  },
  {
    text: "Because Carl created an isotope to make dirt like that.",
    value: 3,
    additionalTextField: false
  },
  {
    text: "Because pedestrians have right-of-way.",
    value: 4,
    additionalTextField: false
  },
  {
    text: "Because Carl hates chemistry.",
    value: 5,
    additionalTextField: false
  }
])

var subQuestions_7 = JSON.stringify([]);

var title_7 = "Carl modifies materials to be used for outdoor trails. Because those who buy his materials worry people taking walks at night won’t be seen by car drivers, they tend to choose the brightest materials for walking trails. Carl doesn’t realize that they choose such materials because they’re attention grabbing, but he does notice that bright materials are most popular. As a result he decides to create a glow-in-the-dark isotope from one of the common materials in dirt, resulting in attention grabbing glow-in-the-dark dirt paths that are an instant hit. Why does Carl’s dirt glow-in-the-dark?"

// ----------------------------------------------------------

var options_8 = JSON.stringify([
  {
    text: "Because they’re attention grabbing at night.",
    value: 1,
    additionalTextField: false
  },
  {
    text: "Because that’s the way Tim wanted them.",
    value: 2,
    additionalTextField: false
  },
  {
    text: "Because Tim dyed them like that.",
    value: 3,
    additionalTextField: false
  },
  {
    text: "Because hats are accessories.",
    value: 4,
    additionalTextField: false
  },
  {
    text: "Because Tim is worried that joggers might develop knee-problems.",
    value: 5,
    additionalTextField: false
  }
])

var subQuestions_8 = JSON.stringify([]);

var title_8 = "Tim manufactures and sells hats at a sporting club. Most of his clients are joggers who worry that car drivers don’t see them when they jog at night, so they buy the brightest colored hats Tim sells. Tim doesn’t realize that they buy these hats because they’re attention grabbing, but he does notice that bright hats sell well. As a result he decides to make a series of glow in the dark hats by dying them with glow-in-the-dark dye. The new hats are an instant hit. Why are Tim's hats glow-in-the-dark?"

// ----------------------------------------------------------

var options_9 = JSON.stringify([
  {
    text: "Because they’re attention grabbing at night.",
    value: 1,
    additionalTextField: false
  },
  {
    text: "Because that’s the way Joseph wanted them.",
    value: 2,
    additionalTextField: false
  },
  {
    text: "Because Joseph genetically modified them to be like that.",
    value: 3,
    additionalTextField: false
  },
  {
    text: "Because dogs have an excellent sense of smell.",
    value: 4,
    additionalTextField: false
  },
  {
    text: "Because Joseph likes cats.",
    value: 5,
    additionalTextField: false
  }
])

var subQuestions_9 = JSON.stringify([]);

var title_9 = "Joseph is a genetic engineer who works on designer pets, specializing in dogs. Because potential dog owners worry about not being seen by car drivers when walking their dogs at night, they tend to choose dogs with brightly colored noses. Joseph doesn’t realize that they choose such noses because they’re attention grabbing, but he does notice that bright noses are popular. As a result he decides to engineer dogs with glow-in-the-dark noses. The new dogs are an instant hit. Why do Joseph's dogs have glow-in-the-dark noses?"


var survey_items = [];

new Survey({name: "Determining Causality"}).fetch()
  .then(function(model) {
  var id = model.get('id');
  survey_items = [
    {
      survey_id: id,
      strategy: "n/a",
      item_type: "multiple_choice",
      title: title_1,
      layout: "multiple_choice",
      position: 1,
      options: options_1,
      sub_questions: subQuestions_1
    },
    {
      survey_id: id,
      strategy: "n/a",
      item_type: "multiple_choice",
      title: title_2,
      layout: "multiple_choice",
      position: 2,
      options: options_2,
      sub_questions: subQuestions_2
    },
    {
      survey_id: id,
      strategy: "n/a",
      item_type: "multiple_choice",
      title: title_3,
      layout: "multiple_choice",
      position: 3,
      options: options_3,
      sub_questions: subQuestions_3
    },
    {
      survey_id: id,
      strategy: "n/a",
      item_type: "multiple_choice",
      title: title_4,
      layout: "multiple_choice",
      position: 4,
      options: options_4,
      sub_questions: subQuestions_4
    },
    {
      survey_id: id,
      strategy: "n/a",
      item_type: "multiple_choice",
      title: title_5,
      layout: "multiple_choice",
      position: 5,
      options: options_5,
      sub_questions: subQuestions_5
    },
    {
      survey_id: id,
      strategy: "n/a",
      item_type: "multiple_choice",
      title: title_6,
      layout: "multiple_choice",
      position: 6,
      options: options_6,
      sub_questions: subQuestions_6
    },
    {
      survey_id: id,
      strategy: "n/a",
      item_type: "multiple_choice",
      title: title_7,
      layout: "multiple_choice",
      position: 7,
      options: options_7,
      sub_questions: subQuestions_7
    },
    {
      survey_id: id,
      strategy: "n/a",
      item_type: "multiple_choice",
      title: title_8,
      layout: "multiple_choice",
      position: 8,
      options: options_8,
      sub_questions: subQuestions_8
    },
    {
      survey_id: id,
      strategy: "n/a",
      item_type: "multiple_choice",
      title: title_9,
      layout: "multiple_choice",
      position: 9,
      options: options_9,
      sub_questions: subQuestions_9
    }
  ];
}).then(function () {
  saveSurveyItems(survey_items);
});
