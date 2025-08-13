import mongoose from "mongoose";
import { Validity } from "../utils/index.js";
const batchSchema = mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    institute: { type: String, required: true },
    validity: Validity,
    classes: [String],
    exams: [{ type: String, required: true }],
    medium: { type: String, required: true }, // english, hindi
    members: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        _id: false,
      },
    ],
    roles: [{ type: String, required: true }],
    promoCode: [{ type: String, required: true }],
    createdAt: { type: String, required: true },
    modifiedAt: { type: String, required: true },
    createdBy: {
      id: { type: String, required: true },
      userType: { type: String, required: true },
      _id: false,
    },
  },
  { collection: "batches" }
);

const Batch = mongoose.model("Batch", batchSchema);

export default Batch;
