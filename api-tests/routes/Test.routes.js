import express from "express";
import {
  getTest,
  createTest,
  updateTest,
  deleteTest,
  getTestById,
  getTestByStudent,
  getTestResultByStudent,
  Result,
  validateKey,
  getRecentTest,
  getTestResultAdmin,
} from "../controllers/index.js";
import auth from "../middleware/auth.js";
import {
  readPermission,
  createTestPermission,
  updateTestPermission,
  deleteTestPermission,
} from "../middleware/permission.js";
const router = express.Router();

router.get("/", auth, readPermission, getTest);
router.get("/recent", getRecentTest);
router.get("/student/:id", auth, getTestByStudent);
router.get("/result/student", auth, getTestResultByStudent);
router.get("/result/admin", auth, getTestResultAdmin);
router.post("/create", auth, createTest);
router.patch("/update", auth, updateTest);
router.delete("/delete/:id", auth, deleteTest);
router.post("/submit", auth, readPermission, Result);
router.get("/valid-key", auth, validateKey);
router.get("/:id", auth, getTestById);
export default router;
