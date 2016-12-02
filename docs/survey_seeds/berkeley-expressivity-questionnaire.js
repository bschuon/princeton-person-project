var createSurvey = require('./create-survey');

var data = {
  survey: {
    name: "Berkeley Expressivity Questionnaire",
    description: "For each statement below, please indicate your agreement or disagreement.",
    est_completion_time_minutes: 20,
    is_featured: true,
    position: 7
  },
  version: {
    version: 1,
    status: "In progress",
    algorithm: {
      tasks: [
        {
          operation: "reverse",
          inputs: [
            "beq-q3", "beq-q8", "beq-q9"
          ],
          min: 1,
          max: 7
        },
        {
          operation: "average",
          output: "negativeExpressivity",
          inputs: ["beq-q9", "beq-q13", "beq-q16", "beq-q3", "beq-q5", "beq-q8"]
        },
        {
          operation: "average",
          output: "positiveExpressivity",
          inputs: ["beq-q6", "beq-q1", "beq-q4", "beq-q10"]
        },
        {
          operation: "average",
          output: "impulseExpressivity",
          inputs: ["beq-q15", "beq-q11", "beq-q14", "beq-q7", "beq-q2", "beq-q12"]
        },
        {
          operation: "average",
          // output: "result",
          output: "overall",
          inputs: [
            "beq-q1", "beq-q2", "beq-q3", "beq-q4", "beq-q5", "beq-q6", "beq-q7",
            "beq-q8", "beq-q9", "beq-q10", "beq-q11", "beq-q12", "beq-q13",
            "beq-q14", "beq-q15", "beq-q16"
          ],
        },
        {
          operation: "pluck",
          output: "result",
          inputs: [
            "overall", "impulseExpressivity", "negativeExpressivity",
            "positiveExpressivity"
          ]
        }
      ]
    }
  },
  questions: [
    {
      id: 'beq-q1',
      group_number: 0,
      group_type: 'table',
      text: "Whenever I feel positive emotions, people can easily see exactly what I am feeling."
    },
    {
      id: 'beq-q2',
      group_number: 0,
      group_type: 'table',
      text: "I sometimes cry during sad movies."
    },
    {
      id: 'beq-q3',
      group_number: 0,
      group_type: 'table',
      text: "People often do not know what I am feeling."
    },
    {
      id: 'beq-q4',
      group_number: 0,
      group_type: 'table',
      text: "I laugh out loud when someone tells me a joke that I think is funny."
    },
    {
      id: 'beq-q5',
      group_number: 0,
      group_type: 'table',
      text: "It is difficult for me to hide my fear."
    },
    {
      id: 'beq-q6',
      group_number: 0,
      group_type: 'table',
      text: "When I'm happy, my feelings show."
    },
    {
      id: 'beq-q7',
      group_number: 0,
      group_type: 'table',
      text: "My body reacts very strongly to emotional situations."
    },
    {
      id: 'beq-q8',
      group_number: 0,
      group_type: 'table',
      text: "I've learned it is better to suppress my anger than to show it."
    },
    {
      id: 'beq-q9',
      group_number: 0,
      group_type: 'table',
      text: "No matter how nervous or upset I am, I tend to keep a calm exterior."
    },
    {
      id: 'beq-q10',
      group_number: 0,
      group_type: 'table',
      text: "I am an emotionally expressive person."
    },
    {
      id: 'beq-q11',
      group_number: 0,
      group_type: 'table',
      text: "I have strong emotions."
    },
    {
      id: 'beq-q12',
      group_number: 0,
      group_type: 'table',
      text: "I am sometimes unable to hide my feelings, even though I would like to."
    },
    {
      id: 'beq-q13',
      group_number: 0,
      group_type: 'table',
      text: "Whenever I feel negative emotions, people can easily see exactly what I am feeling."
    },
    {
      id: 'beq-q14',
      group_number: 0,
      group_type: 'table',
      text: "There have been times when I have not been able to stop crying even though I tried to stop."
    },
    {
      id: 'beq-q15',
      group_number: 0,
      group_type: 'table',
      text: "I experience my emotions very strongly."
    },
    {
      id: 'beq-q16',
      group_number: 0,
      group_type: 'table',
      text: "What I'm feeling is written all over my face."
    }
  ],
  fields: [
    {
      id: 'beq-f1',
      value: 1,
      position: 0,
      text: "1 - Strongly disagree",
      widget: 'radio'
    },
    {
      id: 'beq-f2',
      value: 2,
      position: 1,
      text: "2",
      widget: 'radio'
    },
    {
      id: 'beq-f3',
      value: 3,
      position: 2,
      text: "3",
      widget: 'radio'
    },
    {
      id: 'beq-f4',
      value: 4,
      position: 3,
      text: "4 - Neutral",
      widget: 'radio'
    },
    {
      id: 'beq-f5',
      value: 5,
      position: 4,
      text: "5",
      widget: 'radio'
    },
    {
      id: 'beq-f6',
      value: 6,
      position: 5,
      text: "6",
      widget: 'radio'
    },
    {
      id: 'beq-f7',
      value: 7,
      position: 6,
      text: "7 - Strongly agree",
      widget: 'radio'
    }
  ],
  mappings: [
    {
      qid: 'beq-q1',
      fid: ['beq-f1','beq-f2','beq-f3','beq-f4','beq-f5','beq-f6','beq-f7']
    },
    {
      qid: 'beq-q2',
      fid: ['beq-f1','beq-f2','beq-f3','beq-f4','beq-f5','beq-f6','beq-f7']
    },
    {
      qid: 'beq-q3',
      fid: ['beq-f1','beq-f2','beq-f3','beq-f4','beq-f5','beq-f6','beq-f7']
    },
    {
      qid: 'beq-q4',
      fid: ['beq-f1','beq-f2','beq-f3','beq-f4','beq-f5','beq-f6','beq-f7']
    },
    {
      qid: 'beq-q5',
      fid: ['beq-f1','beq-f2','beq-f3','beq-f4','beq-f5','beq-f6','beq-f7']
    },
    {
      qid: 'beq-q6',
      fid: ['beq-f1','beq-f2','beq-f3','beq-f4','beq-f5','beq-f6','beq-f7']
    },
    {
      qid: 'beq-q7',
      fid: ['beq-f1','beq-f2','beq-f3','beq-f4','beq-f5','beq-f6','beq-f7']
    },
    {
      qid: 'beq-q8',
      fid: ['beq-f1','beq-f2','beq-f3','beq-f4','beq-f5','beq-f6','beq-f7']
    },
    {
      qid: 'beq-q9',
      fid: ['beq-f1','beq-f2','beq-f3','beq-f4','beq-f5','beq-f6','beq-f7']
    },
    {
      qid: 'beq-q10',
      fid: ['beq-f1','beq-f2','beq-f3','beq-f4','beq-f5','beq-f6','beq-f7']
    },
    {
      qid: 'beq-q11',
      fid: ['beq-f1','beq-f2','beq-f3','beq-f4','beq-f5','beq-f6','beq-f7']
    },
    {
      qid: 'beq-q12',
      fid: ['beq-f1','beq-f2','beq-f3','beq-f4','beq-f5','beq-f6','beq-f7']
    },
    {
      qid: 'beq-q13',
      fid: ['beq-f1','beq-f2','beq-f3','beq-f4','beq-f5','beq-f6','beq-f7']
    },
    {
      qid: 'beq-q14',
      fid: ['beq-f1','beq-f2','beq-f3','beq-f4','beq-f5','beq-f6','beq-f7']
    },
    {
      qid: 'beq-q15',
      fid: ['beq-f1','beq-f2','beq-f3','beq-f4','beq-f5','beq-f6','beq-f7']
    },
    {
      qid: 'beq-q16',
      fid: ['beq-f1','beq-f2','beq-f3','beq-f4','beq-f5','beq-f6','beq-f7']
    }
  ]
};

createSurvey(data);
