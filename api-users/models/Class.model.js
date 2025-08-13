import mongoose from "mongoose";
const ClassSchema = mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    fullName: {
      type: String,
      required: true,
    },
    createdAt: { type: String, required: true },
    modifiedAt: { type: String, required: true },
    createdBy: {
      id: { type: String, required: true },
      userType: { type: String, required: true },
      _id: false,
    },
  },
  { collection: "classes" }
);

const Class = mongoose.model("Class", ClassSchema);

export default Class;
