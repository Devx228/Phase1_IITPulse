import mongoose from "mongoose";
import { ChapterSchema } from "./Miscelleaneous.model.js";
const ObjectiveParagraphSchema = mongoose.Schema({
  id: { type: String, required: true }, // // QM_ABCSXYZ
  type: {
    type: String, // single | multiple
  },
  correctAnswers: [String], // OptionIDs
  en: {
    question: String,
    solution: String,
    options: [
      {
        id: String,
        value: String,
      },
    ],
  },
  hi: {
    question: String,
    solution: String,
    options: [
      {
        id: String,
        value: String,
      },
    ],
  },
});

const NumericalParagraphSchema = mongoose.Schema({
  id: { type: String, required: true }, // // QM_ABCSXYZ
  type: {
    type: String, // integer
  },
  correctAnswers: {
    from: Number,
    to: Number,
  }, // OptionIDs
  en: {
    question: String,
    solution: String,
  },
  hi: {
    question: String,
    solution: String,
  },
});

const PagraphSchema = mongoose.Schema(
  {
    _id: { type: String, required: true }, // QP_ABCSXYZ
    id: String, // Q_AB123
    type: String, // single | multiple | integer | paragraph | matrix
    sources: [String],
    subject: String,
    exams: [String],
    paragraph: String,
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
    questions: [],
  },
  {
    collection: "questions",
  }
);

const ParagraphModel = mongoose.model("Paragraph", PagraphSchema);

export default ParagraphModel;
