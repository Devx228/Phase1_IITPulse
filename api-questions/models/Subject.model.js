import mongoose from "mongoose";

const ChapterSchema = mongoose.Schema({
  id: { type: String, required: true }, // CH_ABC123
  name: String,
  subject: String,
  topics: [String],
  _id: false,
});

const subjectSchema = mongoose.Schema(
  {
    _id: String,
    name: String,
    chapters: [ChapterSchema],
  },
  { collection: "subjects" }
);

const SubjectModel = mongoose.model("subject", subjectSchema);
export default SubjectModel;
