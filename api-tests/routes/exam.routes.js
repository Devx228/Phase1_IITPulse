import express from "express";
import {
  createExam,
  getExams,
  updateExam,
  deleteExam,
} from "../controllers/exam.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/create", auth, createExam);
router.get("/all", auth, getExams);
router.patch("/update", auth, updateExam);
router.delete("/delete/:id", auth, deleteExam);

export default router;
