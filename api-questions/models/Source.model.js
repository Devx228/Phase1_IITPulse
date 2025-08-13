import mongoose from "mongoose";

const sourceSchema = mongoose.Schema(
  {
    _id: String,
    name: String,
    createdAt: String,
    updatedAt: String,
  },
  { collection: "sources" }
);

const SourceModel = mongoose.model("source", sourceSchema);
export default SourceModel;
