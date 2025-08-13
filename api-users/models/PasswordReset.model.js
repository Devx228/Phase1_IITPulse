import mongoose from "mongoose";

const PasswordResetSchema = mongoose.Schema(
  {
    _id: { type: String, required: true },
    email: { type: String, required: true },
    resetURI: { type: String, required: true },
    createdAt: { type: String, required: true }, // ISOString
    expiresAt: { type: String, required: true }, // ISOString
  },
  { collection: "resetPassword" }
);

const PasswordReset = mongoose.model("PasswordResetModel", PasswordResetSchema);

export default PasswordReset;