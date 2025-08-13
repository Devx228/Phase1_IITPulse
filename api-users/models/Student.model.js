import mongoose from "mongoose";

const Validity = {
  from: { type: String, required: true },
  to: { type: String, required: true },
};

const studentSchema = mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    standard: { type: String, required: true },
    dob: { type: String, required: true },
    school: { type: String, required: true },
    // aadhaar: { type: Number, required: true },
    contact: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    gender: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    parentDetails: { name: { type: String, required: true }, contact: String },
    batch: { type: String, required: true },
    address: { type: String, required: true },
    // permanentAddress: { type: String, required: true },
    stream: { type: String, required: true },
    medium: { type: String, required: true },
    institute: { type: String, required: true },
    userType: { type: String, required: true },
    validity: { type: Validity, required: true },
    promoCode: { type: String, required: true },
    roles: [
      {
        id: { type: String, required: true },
        from: { type: String, required: true },
        to: { type: String, required: true },
        _id: false,
      },
    ],
    attemptedTests: [String], //it should contain test id's
    createdBy: {
      id: { type: String, required: true },
      userType: { type: String, required: true },
    },
    createdAt: { type: String, required: true },
    modifiedAt: { type: String, required: true },
  },
  {
    collection: "users",
  }
);

const StudentUser = mongoose.model("StudentUser", studentSchema);

export default StudentUser;
