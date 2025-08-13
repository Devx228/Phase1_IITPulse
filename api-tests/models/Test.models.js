import mongoose from "mongoose";
import { Validity, Section, Exam, Result } from "../utils/index.js";

const testSchema = mongoose.Schema(
  {
    _id: { type: String, required: true }, //TT_AB123
    name: { type: String, required: true },
    durationInMinutes: {
      type: Number,
      required: false,
    },
    description: { type: String, required: false },
    sections: [mongoose.Schema(Section)],
    pattern: {
      id: { type: String, required: true },
      name: { type: String, required: true },
    },
    exam: { type: Exam, required: true },
    batches: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        _id: false,
      },
    ],
    status: { type: String, required: false }, // ongoing | active | inactive | expired
    validity: mongoose.Schema(Validity),
    result: { type: Result },
    createdBy: {
      userType: { type: String, required: false },

      id: { type: String, required: false },
      name: { type: String, required: false },
    },
    createdAt: { type: String, required: false },
    modifiedAt: { type: String, required: false },
  },
  { collection: "tests" }
);

export const TestModel = mongoose.model("test", testSchema);

export default TestModel;
