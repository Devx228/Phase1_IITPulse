import express from "express";
import {
  deleteSubject,
  getChapter,
  getSubjects,
  createSubject,
  createChapter,
  getTopics,
  createTopic,
  updateSubject,
  getAllChapters,
  updateSubjectName,
  getAllTopics,
  deleteTopic,
  deleteChapter,
  updateTopic,
  updateChapter,
} from "../controllers/subject.js";

const router = express.Router();

router.get("/chapter", getChapter);
router.patch("/chapter", getChapter);
router.get("/chapter/all", getAllChapters);
router.get("/topic/all", getAllTopics);
router.get("/subjects", getSubjects);
router.delete("/subjects", deleteSubject);
router.post("/topic/delete", deleteTopic);
router.post("/chapter/delete", deleteChapter);
router.patch("/subjects", updateSubject);
router.patch("/subjects/name", updateSubjectName);
router.get("/topics", getTopics);
router.post("/create", createSubject);
router.post("/create-chapter", createChapter);
router.patch("/update-chapter", updateChapter);
router.post("/create-topic", createTopic);
router.patch("/update-topic", updateTopic);

export default router;
