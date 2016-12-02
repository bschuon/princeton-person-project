var createSurvey = require("./create-survey");

var data = {
  survey: {
    name: "Real World Sharing",
    description: "",
    est_completion_time_minutes: 20,
    is_featured: true,
    position: 5
  },
  version: {
    version: 1,
    status: "In progress"
  },
  questions: [
    {
      id: "rw-share-q1",
      master_id: 'rw-share-q1',
      group_number: 0,
      text: "Do you have a Facebook?"
    },
    {
      id: "rw-share-fb-q1",
      group_number: 1,
      group_type: "table",
      dependent_id: "rw-share-q1",
      dependent_value: "1",
      text: "How often do you update your facebook status?"
    },
    {
      id: "rw-share-fb-q2",
      group_number: 1,
      group_type: "table",
      dependent_id: "rw-share-q1",
      dependent_value: "1",
      text: "How often do you post pictures on Facebook?"
    },
    {
      id: "rw-share-fb-q3",
      group_number: 1,
      group_type: "table",
      dependent_id: "rw-share-q1",
      dependent_value: "1",
      text: "How often do you share articles on Facebook?"
    },
    {
      id: "rw-share-fb-q4",
      group_number: 1,
      group_type: "table",
      dependent_id: "rw-share-q1",
      dependent_value: "1",
      text: "How often do you 'like' others posts on Facebook?"
    },
    {
      id: "rw-share-fb-q5",
      group_number: 1,
      group_type: "table",
      dependent_id: "rw-share-q1",
      dependent_value: "1",
      text: "How often do you comment on others Facebook posts?"
    },
    {
      id: "rw-share-fb-q6",
      group_number: 2,
      dependent_id: "rw-share-q1",
      dependent_value: "1",
      text: "Approximately how many facebook friends do you have?"
    },
    {
      id: "rw-share-fb-q7",
      group_number: 3,
      dependent_id: "rw-share-q1",
      dependent_value: "1",
      text: "Approximately how many times do you check your Facebook per day?"
    },
    {
      id: "rw-share-fb-q8",
      group_number: 4,
      dependent_id: "rw-share-q1",
      dependent_value: "1",
      text: "How much time (in minutes) do you spend on Facebook in a typical day?"
    },
    {
      id: "rw-share-q2",
      master_id: 'rw-share-q2',
      group_number: 5,
      text: "Do you have a Twitter account?"
    },
    {
      id: "rw-share-tw-q1",
      group_number: 6,
      dependent_id: "rw-share-q2",
      dependent_value: "1",
      text: "Approximately how many followers do you have on twitter?"
    },
    {
      id: "rw-share-tw-q2",
      group_number: 7,
      dependent_id: "rw-share-q2",
      dependent_value: "1",
      text: "Approximately how many twitter accounts do you follow?"
    },
    {
      id: "rw-share-tw-q3",
      group_number: 8,
      dependent_id: "rw-share-q2",
      dependent_value: "1",
      text: "How often do you tweet?"
    },
    {
      id: "rw-share-tw-q4",
      group_number: 9,
      dependent_id: "rw-share-q2",
      dependent_value: "1",
      text: "How much time (in minutes) do you spend on Twitter in a typical day?"
    },
    {
      id: "rw-share-q3",
      master_id: 'rw-share-q3',
      group_number: 10,
      text: "Do you use Instagram?"
    },
    {
      id: "rw-share-ig-q1",
      group_number: 11,
      dependent_id: "rw-share-q3",
      dependent_value: "1",
      text: "How often do you post pictures on Instagram?"
    },
    {
      id: "rw-share-ig-q2",
      group_number: 12,
      dependent_id: "rw-share-q3",
      dependent_value: "1",
      text: "Approximately how many pictures have you posted on Instagram?"
    },
    {
      id: "rw-share-ig-q3",
      group_number: 13,
      dependent_id: "rw-share-q3",
      dependent_value: "1",
      text: "Approximately how many followers do you have on Instagram?"
    },
    {
      id: "rw-share-ig-q4",
      group_number: 14,
      dependent_id: "rw-share-q3",
      dependent_value: "1",
      text: "Approximately how people do you follow on Instagram?"
    },
    {
      id: "rw-share-ig-q5",
      group_number: 15,
      dependent_id: "rw-share-q3",
      dependent_value: "1",
      text: "Approximately how many times do you check your Instagram per day?"
    },
    {
      id: "rw-share-ig-q6",
      group_number: 16,
      dependent_id: "rw-share-q3",
      dependent_value: "1",
      text: "How much time (in minutes) do you spend on Instagram per day?"
    },
    {
      id: "rw-share-q4",
      group_number: 17,
      text: "On average, how many emails do you SEND per day?"
    },
    {
      id: "rw-share-q5",
      group_number: 18,
      text: "On average, how many emails do you RECEIVE per day?"
    },
    {
      id: "rw-share-q6",
      group_number: 19,
      text: "How much time (in minutes) do you spend on email in a typical day?"
    },
    {
      id: "rw-share-q7",
      group_number: 20,
      text: "How often do you write reviews for the things you buy (Yelp, Amazon, etc)?"
    },
    {
      id: "rw-share-q8",
      group_number: 21,
      group_type: "table",
      text: "How often do you write reviews for the things you buy (Yelp, Amazon, etc)?"
    },
    {
      id: "rw-share-q9",
      group_number: 21,
      group_type: "table",
      text: "How often do you spend time with your friends?"
    },
    {
      id: "rw-share-q10",
      group_number: 22,
      group_type: "table",
      text: "How well do you feel you know your friend?"
    },
    {
      id: "rw-share-q11",
      group_number: 22,
      group_type: "table",
      text: "How well do you feel your friend knows you?"
    },
    {
      id: "rw-share-q12",
      group_number: 23,
      group_type: "table",
      text: "How much do you trust your friend?"
    },
    {
      id: "rw-share-q13",
      group_number: 23,
      group_type: "table",
      text: "How much does your friend trust you?"
    }
  ],
  fields: [
    {
      id: "rw-share-f1",
      widget: "text"
    },
    {
      id: "rw-share-f2",
      value: 1,
      position: 0,
      text: "Yes",
      widget: "radio"
    },
    {
      id: "rw-share-f3",
      value: 2,
      position: 1,
      text: "No",
      widget: "radio"
    },
    {
      id: "rw-share-f4",
      value: 1,
      position: 0,
      text: "Never",
      widget: "radio"
    },
    {
      id: "rw-share-f5",
      value: 2,
      position: 1,
      text: "Less than Once a Month",
      widget: "radio"
    },
    {
      id: "rw-share-f6",
      value: 3,
      position: 2,
      text: "Once a Month",
      widget: "radio"
    },
    {
      id: "rw-share-f7",
      value: 4,
      position: 3,
      text: "2‐3 Times a Month",
      widget: "radio"
    },
    {
      id: "rw-share-f8",
      value: 5,
      position: 4,
      text: "Once a Week",
      widget: "radio"
    },
    {
      id: "rw-share-f9",
      value: 6,
      position: 5,
      text: "2‐3 Times a Week",
      widget: "radio"
    },
    {
      id: "rw-share-f10",
      value: 7,
      position: 6,
      text: "Every other Day",
      widget: "radio"
    },
    {
      id: "rw-share-f11",
      value: 8,
      position: 7,
      text: "Daily",
      widget: "radio"
    },
    {
      id: "rw-share-f12",
      value: 1,
      position: 0,
      text: "Never",
      widget: "radio"
    },
    {
      id: "rw-share-f13",
      value: 2,
      position: 1,
      text: "On occassion",
      widget: "radio"
    },
    {
      id: "rw-share-f14",
      value: 3,
      position: 2,
      text: "About half of the time",
      widget: "radio"
    },
    {
      id: "rw-share-f15",
      value: 4,
      position: 3,
      text: "Most of the time",
      widget: "radio"
    },
    {
      id: "rw-share-f16",
      value: 5,
      position: 4,
      text: "Always",
      widget: "radio"
    },
    {
      id: "rw-share-f17",
      value: 1,
      position: 0,
      text: "Never",
      widget: "radio"
    },
    {
      id: "rw-share-f18",
      value: 2,
      position: 1,
      text: "A few times every year",
      widget: "radio"
    },
    {
      id: "rw-share-f19",
      value: 3,
      position: 2,
      text: "A few times every month",
      widget: "radio"
    },
    {
      id: "rw-share-f20",
      value: 4,
      position: 3,
      text: "A few times every week",
      widget: "radio"
    },
    {
      id: "rw-share-f21",
      value: 5,
      position: 4,
      text: "Every day",
      widget: "radio"
    },
    {
      id: "rw-share-f22",
      value: 1,
      position: 0,
      text: "Not at all",
      widget: "radio"
    },
    {
      id: "rw-share-f23",
      value: 2,
      position: 1,
      text: "A little bit",
      widget: "radio"
    },
    {
      id: "rw-share-f24",
      value: 3,
      position: 2,
      text: "Somewhat",
      widget: "radio"
    },
    {
      id: "rw-share-f25",
      value: 4,
      position: 3,
      text: "Fairly well",
      widget: "radio"
    },
    {
      id: "rw-share-f26",
      value: 5,
      position: 4,
      text: "Very well",
      widget: "radio"
    },
    {
      id: "rw-share-f27",
      value: 6,
      position: 5,
      text: "Extremely well",
      widget: "radio"
    },
    {
      id: "rw-share-f28",
      value: 7,
      position: 6,
      text: "Could not know any better",
      widget: "radio"
    },
    {
      id: "rw-share-f29",
      value: 1,
      position: 0,
      text: "I don't know this person well enough to decide",
      widget: "radio"
    },
    {
      id: "rw-share-f30",
      value: 2,
      position: 1,
      text: "I don't trust this person",
      widget: "radio"
    },
    {
      id: "rw-share-f31",
      value: 3,
      position: 2,
      text: "I trust this person somewhat",
      widget: "radio"
    },
    {
      id: "rw-share-f32",
      value: 4,
      position: 3,
      text: "I generally trust this person",
      widget: "radio"
    },
    {
      id: "rw-share-f33",
      value: 5,
      position: 4,
      text: "I highly trust this person",
      widget: "radio"
    },
    {
      id: "rw-share-f34",
      value: 6,
      position: 5,
      text: "I would trust this person with my life",
      widget: "radio"
    }
  ],
  mappings: [
    {
      qid: "rw-share-q1",
      fid: ["rw-share-f2", "rw-share-f3"]
    },
    {
      qid: "rw-share-fb-q1",
      fid: ["rw-share-f4", "rw-share-f5", "rw-share-f6", "rw-share-f7", "rw-share-f8", "rw-share-f9", "rw-share-f10", "rw-share-f11"]
    },
    {
      qid: "rw-share-fb-q2",
      fid: ["rw-share-f4", "rw-share-f5", "rw-share-f6", "rw-share-f7", "rw-share-f8", "rw-share-f9", "rw-share-f10", "rw-share-f11"]
    },
    {
      qid: "rw-share-fb-q3",
      fid: ["rw-share-f4", "rw-share-f5", "rw-share-f6", "rw-share-f7", "rw-share-f8", "rw-share-f9", "rw-share-f10", "rw-share-f11"]
    },
    {
      qid: "rw-share-fb-q4",
      fid: ["rw-share-f4", "rw-share-f5", "rw-share-f6", "rw-share-f7", "rw-share-f8", "rw-share-f9", "rw-share-f10", "rw-share-f11"]
    },
    {
      qid: "rw-share-fb-q5",
      fid: ["rw-share-f4", "rw-share-f5", "rw-share-f6", "rw-share-f7", "rw-share-f8", "rw-share-f9", "rw-share-f10", "rw-share-f11"]
    },
    {
      qid: "rw-share-fb-q6",
      fid: ["rw-share-f1"]
    },
    {
      qid: "rw-share-fb-q7",
      fid: ["rw-share-f1"]
    },
    {
      qid: "rw-share-fb-q8",
      fid: ["rw-share-f1"]
    },
    {
      qid: "rw-share-q2",
      fid: ["rw-share-f2", "rw-share-f3"]
    },
    {
      qid: "rw-share-tw-q1",
      fid: ["rw-share-f1"]
    },
    {
      qid: "rw-share-tw-q2",
      fid: ["rw-share-f1"]
    },
    {
      qid: "rw-share-tw-q3",
      fid: ["rw-share-f4", "rw-share-f5", "rw-share-f6", "rw-share-f7", "rw-share-f8", "rw-share-f9", "rw-share-f10", "rw-share-f11"]
    },
    {
      qid: "rw-share-tw-q4",
      fid: ["rw-share-f1"]
    },
    {
      qid: "rw-share-q3",
      fid: ["rw-share-f2", "rw-share-f3"]
    },
    {
      qid: "rw-share-ig-q1",
      fid: ["rw-share-f4", "rw-share-f5", "rw-share-f6", "rw-share-f7", "rw-share-f8", "rw-share-f9", "rw-share-f10", "rw-share-f11"]
    },
    {
      qid: "rw-share-ig-q2",
      fid: ["rw-share-f1"]
    },
    {
      qid: "rw-share-ig-q3",
      fid: ["rw-share-f1"]
    },
    {
      qid: "rw-share-ig-q4",
      fid: ["rw-share-f1"]
    },
    {
      qid: "rw-share-ig-q5",
      fid: ["rw-share-f1"]
    },
    {
      qid: "rw-share-ig-q6",
      fid: ["rw-share-f1"]
    },
    {
      qid: "rw-share-q4",
      fid: ["rw-share-f1"]
    },
    {
      qid: "rw-share-q5",
      fid: ["rw-share-f1"]
    },
    {
      qid: "rw-share-q6",
      fid: ["rw-share-f1"]
    },
    {
      qid: "rw-share-q7",
      fid: ["rw-share-f12", "rw-share-f13", "rw-share-f14", "rw-share-f15", "rw-share-f16"]
    },
    {
      qid: "rw-share-q8",
      fid: ["rw-share-f17", "rw-share-f18", "rw-share-f18", "rw-share-f20", "rw-share-f21"]
    },
    {
      qid: "rw-share-q9",
      fid: ["rw-share-f17", "rw-share-f18", "rw-share-f18", "rw-share-f20", "rw-share-f21"]
    },
    {
      qid: "rw-share-q10",
      fid: ["rw-share-f22", "rw-share-f23", "rw-share-f24", "rw-share-f25", "rw-share-f26", "rw-share-f27", "rw-share-f28"]
    },
    {
      qid: "rw-share-q11",
      fid: ["rw-share-f22", "rw-share-f23", "rw-share-f24", "rw-share-f25", "rw-share-f26", "rw-share-f27", "rw-share-f28"]
    },
    {
      qid: "rw-share-q12",
      fid: ["rw-share-f29", "rw-share-f30", "rw-share-f31", "rw-share-f32", "rw-share-f33", "rw-share-f34"]
    },
    {
      qid: "rw-share-q13",
      fid: ["rw-share-f29", "rw-share-f30", "rw-share-f31", "rw-share-f32", "rw-share-f33", "rw-share-f34"]
    }
  ]
};

createSurvey(data);
