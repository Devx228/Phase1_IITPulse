import mongoose from "mongoose";
import pkg from "mongoose";
const schemaTypes = pkg;

export const Validity = {
  from: String,
  to: String,
  _id: false,
};
export const Option = {
  id: String | Number,
  value: String,
  _id: false,
};
export const MarkingScheme = {
  correct: [Number], // index-wise marks (index+1 = no. of correct options)
  incorrect: Number, // -1
  _id: false,
};
export const Question = {
  id: String, // QT_MCQ123
  question: String,
  options: [mongoose.Schema(Option)],
  markingScheme: { type: MarkingScheme },
  correctAnswers: [String],
  //selectedOption: Option | null,
  type: { type: String },
  _id: false,
};
export const SubSection = {
  id: String, // PT_SS_MCQ123
  name: String,
  description: String, // (optional) this will be used as a placeholder for describing the subsection and will be replaced by the actual description later on
  type: { type: String },
  totalQuestions: Number,
  toBeAttempted: Number,
  questions: {},
  markingScheme: {
    correct: { type: Array, required: true },
    incorrect: { type: Number, required: true },
  },
  _id: false,
};

export const Section = {
  id: String, // PT_SE_PHY123
  name: String,
  exam: String,
  subject: String,
  subSections: [mongoose.Schema(SubSection)], // Nesting toBeAttempted
  totalQuestions: Number,
  toBeAttempted: Number,
  // status: String,
  _id: false,
};
export const Exam = {
  id: String,
  name: String, //"JEE_MAINS",
  fullName: String, //"JOINT ENTRANCE EXAMINATION MAINS",
  _id: false,
};
export const EXAMS = {
  JEE_MAINS: {
    id: String,
    name: String, //"JEE_MAINS",
    fullName: String, //"JOINT ENTRANCE EXAMINATION MAINS",
  },
  JEE_ADVANCED: {
    id: String,
    name: String, //"JEE_ADVANCED",
    fullName: String, //"JOINT ENTRANCE EXAMINATION ADVANCED",
  },
  NEET: {
    id: String,
    name: String, //"NEET",
    fullName: String, //"NATIONAL ELIGIBILITY ENTRANCE TEST",
  },
  CAT: {
    id: String,
    name: String, // "CAT",
    fullName: String, //"COMMON ADMISSION TEST",
  },
};

export const Result = {
  highestMarks: Number,
  lowestMarks: Number,
  averageMarks: Number,
  averageCompletionTimeInSeconds: Number, // minutes
  locations: [String],
  totalAppeared: Number,
  publishProps: {
    type: {
      type: String,
      enum: ["immediately", "atTheEndOfTest", "autoAfterXDays", "manual"],
      default: "immediately",
    },
    publishDate: String | null, // ISO String
    isPublished: Boolean,
    publishedBy: {
      userType: String,
      id: String,
      name: String,
    },
  },
  students: [
    {
      name: String,
      _id: String,
      marks: Number,
      submittedOn: String,
    },
  ],
  _id: false,
};
