import express from "express";
import {
  createClass,
  deleteClass,
  getClass,
  getClasses,
  updateClass,
} from "../controllers/index.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/create", auth, createClass);
router.get("/all", auth, getClasses);
router.get("/alll", getClasses);
router.patch("/update", auth, updateClass);
router.delete("/delete/:id", auth, deleteClass);

export default router;
