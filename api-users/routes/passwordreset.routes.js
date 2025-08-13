import express from "express";
const router = express.Router();
import {
  requestPasswordReset,
  verifyResetToken,
  resetPassword,
  getUserDetails,
} from "../controllers/resetPassword.js";

router.post("/request", requestPasswordReset);
router.post("/verify", verifyResetToken);
router.post("/reset", resetPassword);
router.post("/getuser", getUserDetails);

export default router;
