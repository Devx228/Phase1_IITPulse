import express from "express";

const router = express.Router();
import { userLogin } from "../controllers/login.js";
router.post("/login", userLogin);
export default router;
