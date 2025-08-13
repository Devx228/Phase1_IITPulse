import mongoose from "mongoose";
const instituteSchema = mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    members: {
      batches: [
        {
          id: { type: String, required: true },
          name: { type: String, required: true },
          _id: false,
          totalStudents: { type: Number, required: true },
        },
      ],
    },
    createdAt: { type: String, required: true },
    modifiedAt: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    poc: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: Number, required: true },
    },
    address: { type: String, required: true },
  },
  { collection: "institutes" }
);

const Institute = mongoose.model("Institute", instituteSchema);

export default Institute;
