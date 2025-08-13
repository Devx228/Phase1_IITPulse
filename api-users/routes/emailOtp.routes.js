import express from "express";
const routes = express.Router();
import { checkEmailOtp, generateEmailOtp, verifyEmailOtp } from "../controllers/emailOtp.js";
routes.post("/generate", generateEmailOtp);
routes.post("/verify", verifyEmailOtp);
routes.post("/check",checkEmailOtp);

export default routes;
