import express from "express";
import {
  getQuestions,
  getQuestionsById,
  createQuestion,
  createQuestionBulk,
  updateQuestion,
  deleteQuestion,
  getQuestionsByDifficulty,
  autoGenerate,
  getChapter,
} from "../controllers/mcq.js";
import { userAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/all", userAuth, getQuestions);
router.get("/question/:id", getQuestionsById);
router.post("/new", createQuestion);
router.post("/new-bulk", createQuestionBulk);
router.put("/update/:id", updateQuestion);
router.delete("/delete", deleteQuestion);
router.get("/difficulty", getQuestionsByDifficulty);
router.get("/autogenerate", autoGenerate);
router.get("/chapter", getChapter);

export default router;
