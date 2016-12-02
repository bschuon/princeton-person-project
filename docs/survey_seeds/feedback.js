var createSurvey = require('./create-survey');

var data = {
  survey: {
    name: "Feedback",
    description: "Great - we're almost ready to show your results! Before we do, we'd like you to answer a few quick questions. It is critical for our research purposes that you answer the next questions with complete honesty",
    est_completion_time_minutes: 5,
    is_listed: false
  },
  version: {
    version: 1,
    status: "In progress"
  },
  questions: [
    {
      id: 'feedback-q1',
      group_number: 0,
      text: "Have you participated in this survey or experiment, or a very similar one, in the past?"
    },
    {
      id: 'feedback-q2',
      group_number: 1,
      text: "Did you have any technical problems in this experiment that may have influenced your results?"
    },
    {
      id: 'feedback-q3',
      group_number: 2,
      text: "Did you use any strategies that might be considered cheating?"
    },
    {
      id: 'feedback-q4',
      group_number: 3,
      text: "Any comments or things you would like to share with us? If not leave, this field blank"
    }
  ],
  fields: [
    {
      id: 'feedback-f1',
      value: 1,
      position: 0,
      text: "Yes",
      widget: 'radio'
    },
    {
      id: 'feedback-f2',
      value: 2,
      position: 1,
      text: "No",
      widget: 'radio'
    },
    {
      id: 'feedback-f3',
      value: 3,
      position: 2,
      text: "I'm not sure",
      widget: 'radio'
    },
    {
      id: 'feedback-f4',
      widget: 'text'
    }
  ],
  mappings: [
    {
      qid: 'feedback-q1',
      fid: ['feedback-f1', 'feedback-f2', 'feedback-f3']
    },
    {
      qid: 'feedback-q2',
      fid: ['feedback-f1', 'feedback-f2']
    },
    {
      qid: 'feedback-q3',
      fid: ['feedback-f1', 'feedback-f2']
    },
    {
      qid: 'feedback-q4',
      fid: ['feedback-f4']
    }
  ]
};

createSurvey(data);
