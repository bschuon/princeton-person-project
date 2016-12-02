var createSurvey = require('./create-survey');

var data = {
  survey: {
    name: "Demographics",
    description: "",
    est_completion_time_minutes: 20,
    is_listed: false
  },
  version: {
    version: 1,
    status: "In progress"
  },
  questions: [
    {
      id: 'demo-q1',
      group_number: 0,
      text: "Which of the following best describes your family's socioeconomic status?"
    },
    {
      id: 'demo-q2',
      group_number: 1,
      text: "What is your gender?"
    },
    {
      id: 'demo-q3',
      group_number: 2,
      text: "What is your age?"
    },
    {
      id: 'demo-q4',
      group_number: 3,
      text: "What is the zipcode for your hometown?"
    },
    {
      id: 'demo-q5',
      group_number: 4,
      text: "What is your race/ethnicity?"
    },
    {
      id: 'demo-q6',
      group_number: 5,
      text: "What is your primary language (language spoken at home)?"
    }
  ],
  fields: [
    {
      id: 'demo-f1',
      value: 1,
      position: 0,
      text: "Upper Class",
      widget: 'radio'
    },
    {
      id: 'demo-f2',
      value: 2,
      position: 1,
      text: "Upper Middle Class",
      widget: 'radio'
    },
    {
      id: 'demo-f3',
      value: 3,
      position: 2,
      text: "Middle Class",
      widget: 'radio'
    },
    {
      id: 'demo-f4',
      value: 4,
      position: 3,
      text: "Lower Middle Class",
      widget: 'radio'
    },
    {
      id: 'demo-f5',
      value: 5,
      position: 4,
      text: "Lower Class",
      widget: 'radio'
    },
    {
      id: 'demo-f6',
      widget: 'text'
    },
    {
      id: 'demo-f7',
      value: 1,
      position: 0,
      text: "Male",
      widget: 'radio'
    },
    {
      id: 'demo-f8',
      value: 2,
      position: 1,
      text: "Female",
      widget: 'radio'
    },
    {
      id: 'demo-f9',
      value: 3,
      position: 2,
      text: "Other",
      widget: 'radio'
    },
    {
      id: 'demo-f10',
      value: 1,
      position: 0,
      text: "Black or African American",
      widget: 'radio'
    },
    {
      id: 'demo-f11',
      value: 2,
      position: 1,
      text: "White or European American",
      widget: 'radio'
    },
    {
      id: 'demo-f12',
      value: 3,
      position: 2,
      text: "Native American",
      widget: 'radio'
    },
    {
      id: 'demo-f13',
      value: 4,
      position: 3,
      text: "Asian/Pacific Islander",
      widget: 'radio'
    },
    {
      id: 'demo-f14',
      value: 5,
      position: 4,
      text: "Hispanic/Latino",
      widget: 'radio'
    },
    {
      id: 'demo-f15',
      value: 6,
      position: 5,
      text: "Other/Unknown",
      widget: 'radio'
    },
    {
      id: 'demo-f16',
      widget: 'number'
    }
  ],
  mappings: [
    {
      qid: 'demo-q1',
      fid: ['demo-f1','demo-f2','demo-f3','demo-f4','demo-f5']
    },
    {
      qid: 'demo-q2',
      fid: ['demo-f7','demo-f8','demo-f9']
    },
    {
      qid: 'demo-q3',
      fid: ['demo-f16']
    },
    {
      qid: 'demo-q4',
      fid: ['demo-f16']
    },
    {
      qid: 'demo-q5',
      fid: ['demo-f10','demo-f11','demo-f12','demo-f13','demo-f14', 'demo-f15']
    },
    {
      qid: 'demo-q6',
      fid: ['demo-f6']
    }
  ]
};

createSurvey(data);
