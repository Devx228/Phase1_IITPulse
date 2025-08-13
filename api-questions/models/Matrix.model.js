import mongoose from "mongoose";
import { ChapterSchema } from "./Miscelleaneous.model.js";
const MatrixSchema = mongoose.Schema(
  {
    _id: { type: String, required: true }, // QM_ABCSXYZ
    type: String, // single | multiple | integer | paragraph | matrix
    sources: [String],
    subject: String,
    chapters: [
      {
        name: String,
        topics: [],
        _id: false,
      },
    ],
    difficulty: String, // easy | medium | hard
    isProofRead: Boolean,
    createdAt: String,
    modifiedAt: String,
    uploadedBy: {
      userType: String, // operator | teacher | admin
      id: String,
    },
    en: {
      question: String,
      solution: String,
    },
    hi: {
      question: String,
      solution: String,
    },
    exams: [String],
    correctAnswer: [[String]], // 2D Matrix of OptionIDs
  },
  {
    collection: "questions",
  }
);

const MatrixModel = mongoose.model("Matrix", MatrixSchema);

export default MatrixModel;
