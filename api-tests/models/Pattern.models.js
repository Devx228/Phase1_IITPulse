import mongoose from "mongoose";

const patterns = mongoose.Schema(
  {
    _id: String, // PT_JEE_MAINS
    name: String,
    durationInMinutes: Number,
    sections: [],
    exam: String,
    usedIn: [String],
    createdAt: String,
    modifiedAt: String,
    createdBy: {
      userType: String,
      id: String,
    },
  },
  { collection: "patterns" }
);

const PatternModel = mongoose.model("pattern", patterns);

export default PatternModel;
