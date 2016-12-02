var createSurvey = require('./create-survey');

var data = {
  survey: {
    name: "Loneliness",
    description: "The following statements describe how people sometimes feel. For each statement, please indicate how often you feel the way described.",
    est_completion_time_minutes: 20,
    is_featured: true,
    position: 1
  },
  version: {
    version: 1,
    status: "In progress",
    algorithm: {
      tasks: [
        {
          operation: 'reverse',
          inputs: [
            'lone-q1', 'lone-q5', 'lone-q9', 'lone-q10', 'lone-q15',
            'lone-q16', 'lone-q19', 'lone-q20'
          ],
          min: 1,
          max: 4
        },
        {
          operation: 'average',
          output: 'result',
          inputs: [
            'lone-q1', 'lone-q2', 'lone-q3', 'lone-q4', 'lone-q5', 'lone-q6',
            'lone-q7', 'lone-q8', 'lone-q9', 'lone-q10', 'lone-q11', 'lone-q12',
            'lone-q13', 'lone-q14', 'lone-q15', 'lone-q16', 'lone-q17',
            'lone-q18', 'lone-q19', 'lone-q20'
          ]
        }
      ]
    }
  },
  questions: [
    {
      id: 'lone-q1',
      group_number: 0,
      group_type: 'table',
      text: "How often do you feel that you are \"in tune\" with the people around you?"
    },
    {
      id: 'lone-q2',
      group_number: 0,
      group_type: 'table',
      text: "How often do you feel that you lack companionship?"
    },
    {
      id: 'lone-q3',
      group_number: 0,
      group_type: 'table',
      text: "How often do you feel that there is no one you can turn to?"
    },
    {
      id: 'lone-q4',
      group_number: 0,
      group_type: 'table',
      text: "How often do you feel alone?"
    },
    {
      id: 'lone-q5',
      group_number: 0,
      group_type: 'table',
      text: "How often do you feel part of a group of friends?"
    },
    {
      id: 'lone-q6',
      group_number: 0,
      group_type: 'table',
      text: "How often do you feel that you have a lot in common with the people around you?"
    },
    {
      id: 'lone-q7',
      group_number: 0,
      group_type: 'table',
      text: "How often do you feel that you are no longer close to anyone?"
    },
    {
      id: 'lone-q8',
      group_number: 0,
      group_type: 'table',
      text: "How often do you feel that your interests and ideas are not shared by those around you?"
    },
    {
      id: 'lone-q9',
      group_number: 0,
      group_type: 'table',
      text: "How often do you feel outgoing and friendly?"
    },
    {
      id: 'lone-q10',
      group_number: 0,
      group_type: 'table',
      text: "How often do you feel close to people?"
    },
    {
      id: 'lone-q11',
      group_number: 0,
      group_type: 'table',
      text: "How often do you feel left out?"
    },
    {
      id: 'lone-q12',
      group_number: 0,
      group_type: 'table',
      text: "How often do you feel that your relationships with others are not meaningful?"
    },
    {
      id: 'lone-q13',
      group_number: 0,
      group_type: 'table',
      text: "How often do you feel that no one really knows you well?"
    },
    {
      id: 'lone-q14',
      group_number: 0,
      group_type: 'table',
      text: "How often do you feel isolated from others?"
    },
    {
      id: 'lone-q15',
      group_number: 0,
      group_type: 'table',
      text: "How often do you feel you can find companionship when you want it?"
    },
    {
      id: 'lone-q16',
      group_number: 0,
      group_type: 'table',
      text: "How often do you feel that there are people who really understand you?"
    },
    {
      id: 'lone-q17',
      group_number: 0,
      group_type: 'table',
      text: "How often do you feel shy?"
    },
    {
      id: 'lone-q18',
      group_number: 0,
      text: "How often do you feel that people are around you but not with you?"
    },
    {
      id: 'lone-q19',
      group_number: 0,
      text: "How often do you feel that there are people you can talk to?"
    },
    {
      id: 'lone-q20',
      group_number: 0,
      text: "How often do you feel that there are people you can turn to?"
    }
  ],
  fields: [
    {
      id: 'lone-f1',
      value: 1,
      position: 0,
      text: "1 - Never",
      widget: 'radio'
    },
    {
      id: 'lone-f2',
      value: 2,
      position: 1,
      text: "2 - Rarely",
      widget: 'radio'
    },
    {
      id: 'lone-f3',
      value: 3,
      position: 2,
      text: "3 - Sometimes",
      widget: 'radio'
    },
    {
      id: 'lone-f4',
      value: 4,
      position: 3,
      text: "4 - Always",
      widget: 'radio'
    }
  ],
  mappings: [
    {
      qid: 'lone-q1',
      fid: ['lone-f1','lone-f2','lone-f3','lone-f4']
    },
    {
      qid: 'lone-q2',
      fid: ['lone-f1','lone-f2','lone-f3','lone-f4']
    },
    {
      qid: 'lone-q3',
      fid: ['lone-f1','lone-f2','lone-f3','lone-f4']
    },
    {
      qid: 'lone-q4',
      fid: ['lone-f1','lone-f2','lone-f3','lone-f4']
    },
    {
      qid: 'lone-q5',
      fid: ['lone-f1','lone-f2','lone-f3','lone-f4']
    },
    {
      qid: 'lone-q6',
      fid: ['lone-f1','lone-f2','lone-f3','lone-f4']
    },
    {
      qid: 'lone-q7',
      fid: ['lone-f1','lone-f2','lone-f3','lone-f4']
    },
    {
      qid: 'lone-q8',
      fid: ['lone-f1','lone-f2','lone-f3','lone-f4']
    },
    {
      qid: 'lone-q9',
      fid: ['lone-f1','lone-f2','lone-f3','lone-f4']
    },
    {
      qid: 'lone-q10',
      fid: ['lone-f1','lone-f2','lone-f3','lone-f4']
    },
    {
      qid: 'lone-q11',
      fid: ['lone-f1','lone-f2','lone-f3','lone-f4']
    },
    {
      qid: 'lone-q12',
      fid: ['lone-f1','lone-f2','lone-f3','lone-f4']
    },
    {
      qid: 'lone-q13',
      fid: ['lone-f1','lone-f2','lone-f3','lone-f4']
    },
    {
      qid: 'lone-q14',
      fid: ['lone-f1','lone-f2','lone-f3','lone-f4']
    },
    {
      qid: 'lone-q15',
      fid: ['lone-f1','lone-f2','lone-f3','lone-f4']
    },
    {
      qid: 'lone-q16',
      fid: ['lone-f1','lone-f2','lone-f3','lone-f4']
    },
    {
      qid: 'lone-q17',
      fid: ['lone-f1','lone-f2','lone-f3','lone-f4']
    },
    {
      qid: 'lone-q18',
      fid: ['lone-f1','lone-f2','lone-f3','lone-f4']
    },
    {
      qid: 'lone-q19',
      fid: ['lone-f1','lone-f2','lone-f3','lone-f4']
    },
    {
      qid: 'lone-q20',
      fid: ['lone-f1','lone-f2','lone-f3','lone-f4']
    }
  ]
};

createSurvey(data);
