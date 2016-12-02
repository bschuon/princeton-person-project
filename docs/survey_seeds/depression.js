var createSurvey = require('./create-survey');

var data = {
  survey: {
    name: "Depression",
    description: "Please indicate how OFTEN you have experienced the following in the PAST WEEK.",
    est_completion_time_minutes: 30,
    is_featured: true,
    position: 2
  },
  version: {
    version: 1,
    status: "In progress",
    algorithm: {
      tasks: [
        {
          output: 'reverse',
          inputs: ['dprs-q10', 'dprs-q14', 'dprs-q18', 'dprs-q19'],
          operation: 'noop',
          min: 1,
          max: 4
        },
        {
          output: 'result',
          inputs: [
            'dprs-q1', 'dprs-q2', 'dprs-q3', 'dprs-q4',
            'dprs-q5', 'dprs-q6', 'dprs-q7', 'dprs-q8',
            'dprs-q9', 'dprs-q10', 'dprs-q11', 'dprs-q12',
            'dprs-q13', 'dprs-q14', 'dprs-q15', 'dprs-q16',
            'dprs-q17', 'dprs-q18', 'dprs-q19', 'dprs-q20',
          ],
          operation: 'average',
        }
      ]
    }
  },
  questions: [
    {
      id: 'dprs-q1',
      group_number: 0,
      group_type: 'table',
      text: "I was bothered by things that usually don't bother me."
    },
    {
      id: 'dprs-q2',
      group_number: 0,
      group_type: 'table',
      text: "I didn't feel like eating; I had a poor appetite."
    },
    {
      id: 'dprs-q3',
      group_number: 0,
      group_type: 'table',
      text: "I felt that I could not shake off the blues even with help from my family or friends."
    },
    {
      id: 'dprs-q4',
      group_number: 0,
      group_type: 'table',
      text: "I had trouble keeping my mind on what I was doing."
    },
    {
      id: 'dprs-q5',
      group_number: 0,
      group_type: 'table',
      text: "I felt depressed."
    },
    {
      id: 'dprs-q6',
      group_number: 0,
      group_type: 'table',
      text: "I felt like everything I did was an effort."
    },
    {
      id: 'dprs-q7',
      group_number: 0,
      group_type: 'table',
      text: "I thought that my life until now had been a failure."
    },
    {
      id: 'dprs-q8',
      group_number: 0,
      group_type: 'table',
      text: "I felt afraid."
    },
    {
      id: 'dprs-q9',
      group_number: 0,
      group_type: 'table',
      text: "I couldn't sleep well."
    },
    {
      id: 'dprs-q10',
      group_number: 0,
      group_type: 'table',
      text: "I was happy."
    },
    {
      id: 'dprs-q11',
      group_number: 0,
      group_type: 'table',
      text: "I talked less than usual."
    },
    {
      id: 'dprs-q12',
      group_number: 0,
      group_type: 'table',
      text: "I felt lonely."
    },
    {
      id: 'dprs-q13',
      group_number: 0,
      group_type: 'table',
      text: "People were unfriendly."
    },
    {
      id: 'dprs-q14',
      group_number: 0,
      group_type: 'table',
      text: "I enjoyed life."
    },
    {
      id: 'dprs-q15',
      group_number: 0,
      group_type: 'table',
      text: "I had crying spells."
    },
    {
      id: 'dprs-q16',
      group_number: 0,
      group_type: 'table',
      text: "I felt that people disliked me."
    },
    {
      id: 'dprs-q17',
      group_number: 0,
      group_type: 'table',
      text: "I couldn't get going."
    },
    {
      id: 'dprs-q18',
      group_number: 0,
      text: "I felt that I was just as good as other people."
    },
    {
      id: 'dprs-q19',
      group_number: 0,
      text: "I felt hopeful about the future."
    },
    {
      id: 'dprs-q20',
      group_number: 0,
      text: "I felt sad."
    }
  ],
  fields: [
    {
      id: 'dprs-f1',
      value: 1,
      position: 0,
      text: "Less than 1 day: Rarely",
      widget: 'radio'
    },
    {
      id: 'dprs-f2',
      value: 2,
      position: 1,
      text: "1 - 2 days: Some or a little of the time",
      widget: 'radio'
    },
    {
      id: 'dprs-f3',
      value: 3,
      position: 2,
      text: "3 - 4 days: Occasionally or a moderate amount of the time",
      widget: 'radio'
    },
    {
      id: 'dprs-f4',
      value: 4,
      position: 3,
      text: "5 - 7 days: Most or all of the time",
      widget: 'radio'
    },
    {
      id: 'dprs-f1r',
      value: 4,
      position: 0,
      text: "Less than 1 day: Rarely",
      widget: 'radio'
    },
    {
      id: 'dprs-f2r',
      value: 3,
      position: 1,
      text: "1 - 2 days: Some or a little of the time",
      widget: 'radio'
    },
    {
      id: 'dprs-f3r',
      value: 2,
      position: 2,
      text: "3 - 4 days: Occasionally or a moderate amount of the time",
      widget: 'radio'
    },
    {
      id: 'dprs-f4r',
      value: 1,
      position: 3,
      text: "5 - 7 days: Most or all of the time",
      widget: 'radio'
    }
  ],
  mappings: [
    {
      qid: 'dprs-q1',
      fid: ['dprs-f1','dprs-f2','dprs-f3','dprs-f4']
    },
    {
      qid: 'dprs-q2',
      fid: ['dprs-f1','dprs-f2','dprs-f3','dprs-f4']
    },
    {
      qid: 'dprs-q3',
      fid: ['dprs-f1','dprs-f2','dprs-f3','dprs-f4']
    },
    {
      qid: 'dprs-q4',
      fid: ['dprs-f1r','dprs-f2r','dprs-f3r','dprs-f4r']
    },
    {
      qid: 'dprs-q5',
      fid: ['dprs-f1','dprs-f2','dprs-f3','dprs-f4']
    },
    {
      qid: 'dprs-q6',
      fid: ['dprs-f1','dprs-f2','dprs-f3','dprs-f4']
    },
    {
      qid: 'dprs-q7',
      fid: ['dprs-f1','dprs-f2','dprs-f3','dprs-f4']
    },
    {
      qid: 'dprs-q8',
      fid: ['dprs-f1r','dprs-f2r','dprs-f3r','dprs-f4r']
    },
    {
      qid: 'dprs-q9',
      fid: ['dprs-f1r','dprs-f2r','dprs-f3r','dprs-f4r']
    },
    {
      qid: 'dprs-q10',
      fid: ['dprs-f1r','dprs-f2r','dprs-f3r','dprs-f4r']
    },
    {
      qid: 'dprs-q11',
      fid: ['dprs-f1','dprs-f2','dprs-f3','dprs-f4']
    },
    {
      qid: 'dprs-q12',
      fid: ['dprs-f1','dprs-f2','dprs-f3','dprs-f4']
    },
    {
      qid: 'dprs-q13',
      fid: ['dprs-f1','dprs-f2','dprs-f3','dprs-f4']
    },
    {
      qid: 'dprs-q14',
      fid: ['dprs-f1','dprs-f2','dprs-f3','dprs-f4']
    },
    {
      qid: 'dprs-q15',
      fid: ['dprs-f1','dprs-f2','dprs-f3','dprs-f4']
    },
    {
      qid: 'dprs-q16',
      fid: ['dprs-f1','dprs-f2','dprs-f3','dprs-f4']
    },
    {
      qid: 'dprs-q17',
      fid: ['dprs-f1','dprs-f2','dprs-f3','dprs-f4']
    },
    {
      qid: 'dprs-q18',
      fid: ['dprs-f1','dprs-f2','dprs-f3','dprs-f4']
    },
    {
      qid: 'dprs-q19',
      fid: ['dprs-f1','dprs-f2','dprs-f3','dprs-f4']
    },
    {
      qid: 'dprs-q20',
      fid: ['dprs-f1','dprs-f2','dprs-f3','dprs-f4']
    }
  ]
};

createSurvey(data);
