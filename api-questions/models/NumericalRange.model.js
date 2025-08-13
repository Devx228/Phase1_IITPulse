import mongoose from "mongoose";
import { ChapterSchema } from "./Miscelleaneous.model.js";
export const NumericalRangeSchema = mongoose.Schema(
  {
    _id: { type: String, required: true }, // // QN_ABCSXYZ
    type: {
      type: String,
    },
    en: {
      question: String,
      solution: String,
    },
    hi: {
      question: String,
      solution: String,
    },
    correctAnswer: {
      from: Number,
      to: Number,
    },
    exams: [String],
    sources: [String],
    subject: String,
    chapters: [
      {
        name: String,
        topics: [String],
        _id: false,
      },
    ],

    difficulty: String, // easy | medium | hard
    solution: String,
    isProofRead: Boolean,
    createdAt: String, //
    modifiedAt: String,
    uploadedBy: {
      userType: String,
      id: String,
    },
  },
  { collection: "questions" }
);

export const NumericalRangeModel = mongoose.model(
  "NumericalRange",
  NumericalRangeSchema
);

export default NumericalRangeModel;
