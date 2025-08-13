import mongoose from "mongoose";

import { Validity } from "../utils/index.js";

const managerSchema = mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    contact: { type: String, required: true },
    institute: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, required: true },
    validity: { type: Validity, required: true },
    userType: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    dob: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    roles: [
      {
        id: { type: String, required: true },
        from: { type: String, required: true },
        to: { type: String, required: true },
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

const ManagerUser = mongoose.model("ManagerUser", managerSchema);

export default ManagerUser;
