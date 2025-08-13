import mongoose from "mongoose";
const EmailOtpSchema = mongoose.Schema(
    {
        email: { type: String, required: true },
        emailotp: { type: Number, required: true },
        expiryDate: { type: Date, required: true },
    },
    { collection: "emailotp" }
);

const EmailOtp = mongoose.model("EmailOtp", EmailOtpSchema);

export default EmailOtp;
