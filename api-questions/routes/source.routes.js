import express from "express";
import {
  createSource,
  deleteSource,
  getSource,
  getSources,
  updateSource,
} from "../controllers/source.js";

const router = express.Router();

router.get("/all", getSources);
router.get("/single", getSource);
router.post("/create", createSource);
router.patch("/update", updateSource);
router.delete("/delete/:id", deleteSource);

export default router;
