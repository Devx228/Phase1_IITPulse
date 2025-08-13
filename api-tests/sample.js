import {
  generateQuestions,
  generateQuestionsFromStudent,
  generateQuestionsStudentToBackend,
} from "./tempUtils.js";
import { v4 as uuid } from "uuid";

export const ROLES = {
  ADMIN: "admin",
  TEACHER: "teacher",
  STUDENT: "student",
};

const sections = ["Physics", "Chemistry", "Maths"];

const TEST_FOR_ADMIN = {
  id: "IITP_AB12456",
  name: "Sample Test",
  description: "Sample Test Description",
  sections: sections.map((sec, i) => ({
    id: "PT_SE_" + i,
    name: sec,
    exam: "JEE Mains",
    subject: sec,
    totalQuestions: 40,
    toBeAttempted: 30,
    subSections: [
      {
        id: "PT_SS_MCQ123_" + sec,
        name: "MCQ",
        description: "Sample MCQ",
        type: "single",
        totalQuestions: 40,
        toBeAttempted: 30,
        questions: generateQuestions(40, sec),
      },
    ],
  })),
  exam: {
    id: "JEEMAINS",
    name: "JEE_MAINS",
    fullName: "JOINT ENTRANCE EXAMINATION MAINS",
  },
  status: "ongoing",
  validity: {
    from: new Date("2022-01-01").toISOString(),
    to: new Date("2023-12-31").toISOString(),
  },
  attemptedBy: {
    studentsCount: 10,
    locations: ["Bangalore", "Mumbai"],
  },
  result: {
    maxMarks: 1,
    averageMarks: 0.5,
    averageCompletionTime: 30,
    students: [
      {
        name: "John",
        id: "ST_AB123",
        marks: 1,
      },
      {
        name: "Jane",
        id: "ST_AB124",
        marks: 1,
      },
      {
        name: "Jack",
        id: "ST_AB125",
        marks: 1,
      },
      {
        name: "Jill",
        id: "ST_AB126",
        marks: 1,
      },
    ],
  },
  createdBy: {
    id: "IITP_TR_AB123",
    name: "John",
    userType: ROLES.TEACHER,
  },
  createdAt: new Date().toISOString(),
  modifiedAt: new Date().toISOString(),
};

const TEST_FOR_STUDENT_RECEIVE_TO_FRONTEND = {
  id: "IITP_AB123",
  name: "Sample Test",
  description: "Sample Test Description",
  sections: sections.map((sec, i) => ({
    id: "PT_SE_" + i,
    name: sec,
    exam: "JEE Mains",
    subject: "Physics",
    totalQuestions: 40,
    toBeAttempted: 30,
    subSections: [
      {
        id: "PT_SS_MCQ123",
        name: "MCQ",
        description: "Sample MCQ",
        type: "single",
        totalQuestions: 40,
        toBeAttempted: 30,
        questions: generateQuestions(40, sec),
      },
    ],
  })),
  exam: {
    id: "JEEMAINS",
    name: "uidasdkx",
    fullName: "asdxhklx",
  },
  status: "ongoing",
  validity: {
    from: new Date("2022-01-01").toISOString(),
    to: new Date("2023-12-31").toISOString(),
  },
  createdAt: new Date().toISOString(),
  modifiedAt: new Date().toISOString(),
};

const TEST_FOR_STUDENT_SEND_TO_BACKEND = {
  id: "IITP_AB123",
  sections: sections.map((sec, i) => ({
    id: "PT_SE_" + i,
    subSections: [
      {
        id: "PT_SS_MCQ123",
        questions: generateQuestionsFromStudent(40, sec),
      },
    ],
  })),
  status: "ongoing",
  validity: {
    from: new Date("2022-01-01").toISOString(),
    to: new Date("2023-12-31").toISOString(),
  },
  createdAt: new Date().toISOString(),
  modifiedAt: new Date().toISOString(),
};

const mapSelectedOptions = {
  QT_MCQ123: ["QO_MCQ123_B", "QO_MCQ123_C"],
};

const correctAnswers = {
  QT_MCQ123: ["QO_MCQ123_B", "QO_MCQ123_C"],
};

const TEST_FOR_STUDENT_SEND_TO_DATABASE_AFTER_MARKING = {
  id: "StudentId",
  sections: sections.map((sec, i) => ({
    id: "PT_SE_" + i,
    subSections: [
      {
        id: "PT_SS_MCQ123",
        questions: generateQuestionsStudentToBackend(40, sec),
      },
    ],
  })),
  status: "Done",
  validity: {
    from: new Date("2022-01-01").toISOString(),
    to: new Date("2023-12-31").toISOString(),
  },
  createdAt: new Date().toISOString(),
  modifiedAt: new Date().toISOString(),
};

import axios from "axios";
//console.log(SAMPLE_TEST_FINAL);
// axios
//   .post("http://localhost:8082/test/create", {
//     user: {
//       id: "asdfksdf",
//     },
//     test: TEST_FOR_ADMIN,
//   })
//   .then((res) => {
//     console.log(res.data);
//   });

axios.post("http://localhost:8082/test/create", TEST_FOR_ADMIN).then((res) => {
  console.log(res.data);
});
