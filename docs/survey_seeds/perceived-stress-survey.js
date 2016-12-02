var createSurvey = require('./create-survey');

var data = {
  survey: {
    name: "Perceived Stress Survey",
    description: "The questions in this scale ask you about your feelings and thoughts during THE LAST MONTH. In each case, please indicate your response representing HOW OFTEN you felt or thought a certain way.",
    est_completion_time_minutes: 30,
    is_featured: true,
    position: 6
  },
  version: {
    version: 1,
    status: "In progress",
    algorithm: {
      tasks: [
        {
          operation: 'noop',
          inputs: [
            'pss-q4', 'pss-q5', 'pss-q7', 'pss-q8'
          ],
          min: 1,
          max: 5
        },
        {
          operation: 'average',
          output: 'result',
          inputs: [
            'pss-q1', 'pss-q2', 'pss-q3', 'pss-q4', 'pss-q5', 'pss-q6',
            'pss-q7', 'pss-q8', 'pss-q9', 'pss-q10'
          ]
        }
      ]
    }
  },
  questions: [
    {
      id: 'pss-q1',
      group_number: 0,
      group_type: 'table',
      text: "In the last month, how often have you been upset because of something that happened unexpectedly?"
    },
    {
      id: 'pss-q2',
      group_number: 0,
      group_type: 'table',
      text: "In the last month, how often have you felt that you were unable to control the important things in your life?"
    },
    {
      id: 'pss-q3',
      group_number: 0,
      group_type: 'table',
      text: "In the last month, how often have you felt nervous and \"stressed?\""
    },
    {
      id: 'pss-q4',
      group_number: 0,
      group_type: 'table',
      text: "In the last month, how often have you felt confident about your ability to handle your personal problems?"
    },
    {
      id: 'pss-q5',
      group_number: 0,
      group_type: 'table',
      text: "In the last month, how often have you felt that things were going your way?"
    },
    {
      id: 'pss-q6',
      group_number: 0,
      group_type: 'table',
      text: "In the last month, how often have you found that you could not cope with all the things that you had to do?"
    },
    {
      id: 'pss-q7',
      group_number: 0,
      group_type: 'table',
      text: "In the last month, how often have you been able to control irritations in your life?"
    },
    {
      id: 'pss-q8',
      group_number: 0,
      group_type: 'table',
      text: "In the last month, how often have you felt that you were on top of things?"
    },
    {
      id: 'pss-q9',
      group_number: 0,
      group_type: 'table',
      text: "In the last month, how often have you been angered because of things that were outside your control?"
    },
    {
      id: 'pss-q10',
      group_number: 0,
      group_type: 'table',
      text: "In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?"
    }
  ],
  fields: [
    {
      id: 'pss-f1',
      value: 1,
      position: 0,
      text: "1 - Never",
      widget: 'radio'
    },
    {
      id: 'pss-f2',
      value: 2,
      position: 1,
      text: "2 - Almost never",
      widget: 'radio'
    },
    {
      id: 'pss-f3',
      value: 3,
      position: 2,
      text: "3 - Sometimes",
      widget: 'radio'
    },
    {
      id: 'pss-f4',
      value: 4,
      position: 3,
      text: "4 - Fairly often",
      widget: 'radio'
    },
    {
      id: 'pss-f5',
      value: 5,
      position: 4,
      text: "5 - Very often",
      widget: 'radio'
    },
    {
      id: 'pss-f1r',
      value: 5,
      position: 0,
      text: "1 - Never",
      widget: 'radio'
    },
    {
      id: 'pss-f2r',
      value: 4,
      position: 1,
      text: "2 - Almost never",
      widget: 'radio'
    },
    {
      id: 'pss-f3r',
      value: 3,
      position: 2,
      text: "3 - Sometimes",
      widget: 'radio'
    },
    {
      id: 'pss-f4r',
      value: 2,
      position: 3,
      text: "4 - Fairly often",
      widget: 'radio'
    },
    {
      id: 'pss-f5r',
      value: 1,
      position: 4,
      text: "5 - Very often",
      widget: 'radio'
    }
  ],
  mappings: [
    {
      qid: 'pss-q1',
      fid: ['pss-f1','pss-f2','pss-f3','pss-f4', 'pss-f5']
    },
    {
      qid: 'pss-q2',
      fid: ['pss-f1','pss-f2','pss-f3','pss-f4', 'pss-f5']
    },
    {
      qid: 'pss-q3',
      fid: ['pss-f1','pss-f2','pss-f3','pss-f4', 'pss-f5']
    },
    {
      qid: 'pss-q4',
      fid: ['pss-f1r','pss-f2r','pss-f3r','pss-f4r', 'pss-f5r']
    },
    {
      qid: 'pss-q5',
      fid: ['pss-f1r','pss-f2r','pss-f3r','pss-f4r', 'pss-f5r']
    },
    {
      qid: 'pss-q6',
      fid: ['pss-f1','pss-f2','pss-f3','pss-f4', 'pss-f5']
    },
    {
      qid: 'pss-q7',
      fid: ['pss-f1r','pss-f2r','pss-f3r','pss-f4r', 'pss-f5r']
    },
    {
      qid: 'pss-q8',
      fid: ['pss-f1r','pss-f2r','pss-f3r','pss-f4r', 'pss-f5r']
    },
    {
      qid: 'pss-q9',
      fid: ['pss-f1','pss-f2','pss-f3','pss-f4', 'pss-f5']
    },
    {
      qid: 'pss-q10',
      fid: ['pss-f1','pss-f2','pss-f3','pss-f4', 'pss-f5']
    }
  ]
};

createSurvey(data);
