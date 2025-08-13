import express from "express";
import {
  getPatterns,
  getPatternById,
  createPattern,
  getPatternsByExam,
  updatePattern,
  deletePattern,
} from "../controllers/index.js";
const routes = express.Router();

routes.get("/all", getPatterns);
routes.get("/single", getPatternById);
routes.post("/create", createPattern);
routes.get("/pattern/exam", getPatternsByExam);
routes.patch("/update", updatePattern);
routes.delete("/delete", deletePattern);

export default routes;
