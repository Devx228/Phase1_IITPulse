import express from "express";
import {
  getQuestions,
  getQuestionById,
  createQuestion,
  createQuestionBulk,
  updateQuestion,
  deleteQuestion,
  autoGenerateInteger,
} from "../controllers/numerical.js";
// import { userAuth } from "../middleware/auth.js";
// import { userPermission } from "../middleware/permission.js";
const router = express.Router();

router.get("/questions", getQuestions);
router.get("/question/:id", getQuestionById);
router.post("/new", createQuestion);
router.post("/new-bulk", createQuestionBulk);
router.get("/autogenerate", autoGenerateInteger);
router.put("/update/:id", updateQuestion);
router.delete("/delete", deleteQuestion);

export default router;
