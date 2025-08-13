import express from "express";
import {
  getQuestions,
  getQuestionById,
  createQuestion,
  createQuestionBulk,
  updateQuestion,
  deleteQuestion,
  //   getQuestionsByDifficulty,
} from "../controllers/matrix.js";
import { userAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/all", userAuth, getQuestions);
router.get("/question/:id", getQuestionById);
router.post("/new", createQuestion);
router.post("/newbulk", createQuestionBulk);
router.put("/update/:id", updateQuestion);
router.delete("/delete", deleteQuestion);
// router.get("/difficulty", getQuestionsByDifficulty);
// router.get("/autogenerate", autoGenerate);
// router.get("/chapter", getChapter);

export default router;
