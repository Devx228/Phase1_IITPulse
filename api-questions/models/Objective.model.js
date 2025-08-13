import mongoose from "mongoose";
import { ChapterSchema } from "./Miscelleaneous.model.js";

export const ObjectiveSchema = mongoose.Schema(
  {
    _id: { type: String, required: true }, //   // QM_ABCSXYZ
    type: {
      type: String, //
    },
    correctAnswers: [String], // OptionIDs
    sources: [String],
    subject: String,
    chapters: [
      {
        name: String,
        topics: [String],
        _id: false,
      },
    ],
    exams: [String],
    difficulty: String, // easy | medium | hard
    isProofRead: Boolean,
    createdAt: String, //
    modifiedAt: String,
    uploadedBy: {
      userType: String,
      id: String,
      _id: false,
    },
    en: {
      question: String,
      options: [
        {
          id: { type: String, required: true },
          value: String,
          _id: false,
        },
      ],
      solution: String,
    },
    hi: {
      question: String,
      options: [
        {
          id: { type: String, required: true },
          value: String,
          _id: false,
        },
      ],
      solution: String,
    },
  },
  { collection: "questions" }
);

const ObjectiveModel = mongoose.model("Objective", ObjectiveSchema);

export default ObjectiveModel;
