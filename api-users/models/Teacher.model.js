import mongoose from "mongoose";

const Validity = {
  from: { type: String, required: true },
  to: { type: String, required: true },
};

const teacherSchema = mongoose.Schema(
  {
    _id: { type: String, required: true }, // INSTITUTE_ID_TR_ABCDEF123
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    contact: { type: String, required: true },
    institute: { type: String, required: true },
    userType: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    dob: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    validity: { type: Validity, required: true },
    subjects: [
      {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        id: false,
      },
    ],
    gender: { type: String, required: true },
    roles: [
      {
        id: { type: String, required: true },
        from: { type: String, required: true },
        to: { type: String, required: true },
        _id: false,
      },
    ],
    previousTests: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        exam: { type: String, required: true },
        createdAt: { type: String, required: true },
        _id: false,
      },
    ],
    createdBy: {
      id: { type: String, required: true },
      userType: { type: String, required: true },
      _id: false,
    },
    createdAt: { type: String, required: true },
    modifiedAt: { type: String, required: true },
  },
  { collection: "users" }
);

const TeacherUser = mongoose.model("TeacherUser", teacherSchema);

export default TeacherUser;
