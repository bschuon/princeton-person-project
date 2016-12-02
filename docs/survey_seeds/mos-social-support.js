var createSurvey = require('./create-survey');

var data = {
  survey: {
    name: "MOS Social Support",
    description: "Next are some questions about the support that is available to you.",
    est_completion_time_minutes: 20,
    is_featured: true,
    position: 3
  },
  version: {
    version: 1,
    status: "In progress",
    algorithm: {
      tasks: [
        {
          operation: 'average',
          output: 'tangibleSupport',
          inputs: [
            'mosss-q1', 'mosss-q4', 'mosss-q11', 'mosss-q14'
          ]
        },
        {
          operation: 'average',
          output: 'affectionateSupport',
          inputs: [
            'mosss-q5', 'mosss-q9', 'mosss-q19'
          ]
        },
        {
          operation: 'average',
          output: 'positiveSocialInteraction',
          inputs: [
            'mosss-q6', 'mosss-q10', 'mosss-q17'
          ]
        },
        {
          operation: 'average',
          output: 'emotionalSupport',
          inputs: [
            'mosss-q2', 'mosss-q8', 'mosss-q15', 'mosss-q18'
          ]
        },
        {
          operation: 'average',
          output: 'informationalSupport',
          inputs: [
            'mosss-q3', 'mosss-q7', 'mosss-q12', 'mosss-q16'
          ]
        },
        {
          operation: 'average',
          // output: 'result',
          output: 'overall',
          inputs: [
            'mosss-q1', 'mosss-q2', 'mosss-q3', 'mosss-q4', 'mosss-q5',
            'mosss-q6', 'mosss-q7', 'mosss-q8', 'mosss-q9', 'mosss-q10',
            'mosss-q11', 'mosss-q12', 'mosss-q13', 'mosss-q14', 'mosss-q15',
            'mosss-q16', 'mosss-q17', 'mosss-q18', 'mosss-q19', 'mosss-q20',
            'mosss-q21'
          ]
        },
        {
          operation: 'pluck',
          output: 'result',
          inputs: [
           'tangibleSupport', 'affectionateSupport', 'positiveSocialInteraction',
           'emotionalSupport', 'informationalSupport', 'overall'
          ]
        },
      ]
    }
  },
  questions: [
    {
      id: 'mosss-q1',
      group_number: 0,
      group_type: 'table',
      text: "Someone to give you information to help you understand a situation"
    },
    {
      id: 'mosss-q2',
      group_number: 0,
      group_type: 'table',
      text: "Someone to help with daily chores if you were sick"
    },
    {
      id: 'mosss-q3',
      group_number: 0,
      group_type: 'table',
      text: "Someone to take you to the doctor if you needed it"
    },
    {
      id: 'mosss-q4',
      group_number: 0,
      group_type: 'table',
      text: "Someone to give you good advice about a crisis"
    },
    {
      id: 'mosss-q5',
      group_number: 0,
      group_type: 'table',
      text: "Someone to get together with for relaxation"
    },
    {
      id: 'mosss-q6',
      group_number: 0,
      group_type: 'table',
      text: "Someone to share your most private worries and fears with"
    },
    {
      id: 'mosss-q7',
      group_number: 0,
      group_type: 'table',
      text: "Someone to have a good time with"
    },
    {
      id: 'mosss-q8',
      group_number: 0,
      group_type: 'table',
      text: "Someone to do something enjoyable with"
    },
    {
      id: 'mosss-q9',
      group_number: 0,
      group_type: 'table',
      text: "Someone who shows you love and affection"
    },
    {
      id: 'mosss-q10',
      group_number: 0,
      group_type: 'table',
      text: "Someone to do things with to help get your mind off things"
    },
    {
      id: 'mosss-q11',
      group_number: 0,
      group_type: 'table',
      text: "Someone you can count on to listen to you when you need to talk"
    },
    {
      id: 'mosss-q12',
      group_number: 0,
      group_type: 'table',
      text: "Someone who hugs you"
    },
    {
      id: 'mosss-q13',
      group_number: 0,
      group_type: 'table',
      text: "Someone who understands your problems"
    },
    {
      id: 'mosss-q14',
      group_number: 0,
      group_type: 'table',
      text: "Someone to help you if you were confined to bed"
    },
    {
      id: 'mosss-q15',
      group_number: 0,
      group_type: 'table',
      text: "Someone to love and make you feel wanted"
    },
    {
      id: 'mosss-q16',
      group_number: 0,
      group_type: 'table',
      text: "Someone to confide in or talk to about yourself or your problems"
    },
    {
      id: 'mosss-q17',
      group_number: 0,
      group_type: 'table',
      text: "Someone to prepare your meals if you were unable to do it yourself"
    },
    {
      id: 'mosss-q18',
      group_number: 0,
      group_type: 'table',
      text: "Someone whose advice you really want"
    },
    {
      id: 'mosss-q19',
      group_number: 0,
      group_type: 'table',
      text: "Someone to turn to for suggestions about how to deal with a personal problem"
    },
    {
      id: 'mosss-q20',
      group_number: 1,
      text: "About how many CLOSE friends and relatives do you have (people you feel at ease with and can talk to about what is on your mind)? Write in the number of close friends and close relatives:"
    },
    {
      id: 'mosss-q21',
      group_number: 2,
      text: "About how many people in your life would you consider a friend?"
    }
  ],
  fields: [
    {
      id: 'mosss-f1',
      value: 1,
      position: 0,
      text: "1 - None of the time",
      widget: 'radio'
    },
    {
      id: 'mosss-f2',
      value: 2,
      position: 1,
      text: "2 - A little of the time",
      widget: 'radio'
    },
    {
      id: 'mosss-f3',
      value: 3,
      position: 2,
      text: "3 - Some of the time",
      widget: 'radio'
    },
    {
      id: 'mosss-f4',
      value: 4,
      position: 3,
      text: "4 - Most of the time",
      widget: 'radio'
    },
    {
      id: 'mosss-f5',
      value: 5,
      position: 4,
      text: "5 - All of the time",
      widget: 'radio'
    },
    {
      id: 'mosss-f6',
      widget: 'text'
    }
  ],
  mappings: [
    {
      qid: 'mosss-q1',
      fid: ['mosss-f1','mosss-f2','mosss-f3','mosss-f4','mosss-f5']
    },
    {
      qid: 'mosss-q2',
      fid: ['mosss-f1','mosss-f2','mosss-f3','mosss-f4','mosss-f5']
    },
    {
      qid: 'mosss-q3',
      fid: ['mosss-f1','mosss-f2','mosss-f3','mosss-f4','mosss-f5']
    },
    {
      qid: 'mosss-q4',
      fid: ['mosss-f1','mosss-f2','mosss-f3','mosss-f4','mosss-f5']
    },
    {
      qid: 'mosss-q5',
      fid: ['mosss-f1','mosss-f2','mosss-f3','mosss-f4','mosss-f5']
    },
    {
      qid: 'mosss-q6',
      fid: ['mosss-f1','mosss-f2','mosss-f3','mosss-f4','mosss-f5']
    },
    {
      qid: 'mosss-q7',
      fid: ['mosss-f1','mosss-f2','mosss-f3','mosss-f4','mosss-f5']
    },
    {
      qid: 'mosss-q8',
      fid: ['mosss-f1','mosss-f2','mosss-f3','mosss-f4','mosss-f5']
    },
    {
      qid: 'mosss-q9',
      fid: ['mosss-f1','mosss-f2','mosss-f3','mosss-f4','mosss-f5']
    },
    {
      qid: 'mosss-q10',
      fid: ['mosss-f1','mosss-f2','mosss-f3','mosss-f4','mosss-f5']
    },
    {
      qid: 'mosss-q11',
      fid: ['mosss-f1','mosss-f2','mosss-f3','mosss-f4','mosss-f5']
    },
    {
      qid: 'mosss-q12',
      fid: ['mosss-f1','mosss-f2','mosss-f3','mosss-f4','mosss-f5']
    },
    {
      qid: 'mosss-q13',
      fid: ['mosss-f1','mosss-f2','mosss-f3','mosss-f4','mosss-f5']
    },
    {
      qid: 'mosss-q14',
      fid: ['mosss-f1','mosss-f2','mosss-f3','mosss-f4','mosss-f5']
    },
    {
      qid: 'mosss-q15',
      fid: ['mosss-f1','mosss-f2','mosss-f3','mosss-f4','mosss-f5']
    },
    {
      qid: 'mosss-q16',
      fid: ['mosss-f1','mosss-f2','mosss-f3','mosss-f4','mosss-f5']
    },
    {
      qid: 'mosss-q17',
      fid: ['mosss-f1','mosss-f2','mosss-f3','mosss-f4','mosss-f5']
    },
    {
      qid: 'mosss-q18',
      fid: ['mosss-f1','mosss-f2','mosss-f3','mosss-f4','mosss-f5']
    },
    {
      qid: 'mosss-q19',
      fid: ['mosss-f1','mosss-f2','mosss-f3','mosss-f4','mosss-f5']
    },
    {
      qid: 'mosss-q20',
      fid: ['mosss-f6']
    },
    {
      qid: 'mosss-q21',
      fid: ['mosss-f6']
    }
  ]
};

createSurvey(data);
