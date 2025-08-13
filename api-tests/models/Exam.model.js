import mongoose from "mongoose";

const examSchema = mongoose.Schema(
  {
    _id: String,
    name: String, //"JEE_MAINS",
    fullName: String,
    createdBy: {
      userType: {
        type: String,
      },
      id: String,
      name: String,
    },
    createdAt: String,
    modifiedAt: String,
  },
  { collection: "exams" }
);

export const ExamModel = mongoose.model("exam", examSchema);

export default ExamModel;
