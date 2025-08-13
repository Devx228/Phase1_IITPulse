import { v4 as uuid } from "uuid";

let allQuestion = [
  {
    question: "What is the value of R in ideal gas?",
    options: [
      {
        id: "QO_MCQ123_A",
        value: "1",
      },
      {
        id: "QO_MCQ123_B",
        value: "2",
      },
      {
        id: "QO_MCQ123_C",
        value: "3",
      },
      {
        id: "QO_MCQ123_D",
        value: "4",
      },
    ],
    markingScheme: {
      correct: [1, 4],
      incorrect: -1,
    },
    type: "single",
    correctAnswers: ["QO_MCQ123_A", "QO_MCQ123_C"],
  },
  {
    question: "Is Kinetic Energy scalar or vector?",
    options: [
      {
        id: "QO_MCQ123_A",
        value: "Scalar",
      },
      {
        id: "QO_MCQ123_B",
        value: "Vector",
      },
      {
        id: "QO_MCQ123_C",
        value: "Both",
      },
      {
        id: "QO_MCQ123_D",
        value: "None of these",
      },
    ],
    markingScheme: {
      correct: [4],
      incorrect: -1,
    },
    type: "multiple",
    correctAnswers: ["QO_MCQ123_A"],
  },
  {
    question: "What is the value of w^3 in cube rute of unity?",
    options: [
      {
        id: "QO_MCQ123_A",
        value: "1",
      },
      {
        id: "QO_MCQ123_B",
        value: "-1",
      },
      {
        id: "QO_MCQ123_C",
        value: "0",
      },
      {
        id: "QO_MCQ123_D",
        value: "w",
      },
    ],
    markingScheme: {
      correct: [4],
      incorrect: -1,
    },
    type: "multiple",
    correctAnswers: ["QO_MCQ123_A"],
  },
];

export function generateQuestions(count, sec) {
  let questions = {};
  for (let i = 0; i < count; i++) {
    let id = "QT_MCQ123" + sec + i;
    questions[id] = {
      ...allQuestion[Math.floor(Math.random() * allQuestion.length)],
      id,
    };
  }

  return questions;
}
let ca = ["QO_MCQ123_A", "QO_MCQ123_B", "QO_MCQ123_C"];
export function generateQuestionsFromStudent(count, sec) {
  let questions = {};
  for (let i = 0; i < count; i++) {
    let id = "QT_MCQ123" + sec + i;
    questions[id] = {
      id,
      selectedOptions: [ca[Math.floor(Math.random() * ca.length)]],
      answered: true,
      visited: true,
      answeredAndMarkedForReview: false,
      markedForReview: false,
      timeTakenInSeconds: 140,
    };
  }

  return questions;
}

export function generateQuestionsStudentToBackend(count, sec) {
  let questions = {};
  for (let i = 0; i < count; i++) {
    let id = "QT_MCQ123" + sec + i;
    questions[id] = {
      id,
      selectedOptions: ["QO_MCQ123_B", "QO_MCQ123_C"],
      marks: 1,
      wrongAnswers: ["QO_MCQ123_A"],
      correctAnswers: ["QO_MCQ123_B", "QO_MCQ123_C"],
      timeTakenInSeconds: 30,
    };
  }

  return questions;
}
