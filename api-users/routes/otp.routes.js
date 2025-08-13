import express from "express";
const routes = express.Router();
import { checkOtp, generateOtp, verifyOtp } from "../controllers/otp.js";
routes.post("/generate", generateOtp);
routes.post("/verify", verifyOtp);
routes.post("/check", checkOtp);

export default routes;
