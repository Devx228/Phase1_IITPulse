import mongoose from "mongoose";
const otpSchema = mongoose.Schema(
  {
    number: { type: String, required: true },
    otp: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
  },
  { collection: "otp" }
);

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;
