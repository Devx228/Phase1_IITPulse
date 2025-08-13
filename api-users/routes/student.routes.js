import express from "express";
import multer from "multer";

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(console.log(file.originalname), file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine });
import {
  getData,
  createUser,
  deleteUser,
  updateUser,
  getSingleData,
  createStudent,
} from "../controllers/student.js";
import { joinBatch } from "../controllers/batch.js";
import auth from "../middleware/auth.js";
import { uploadBulkUser } from "../controllers/bulkUserExcel.js";
const router = express.Router();

// we need user token and the id for all auth routes
router.get("/", getData); // to get all teachers data
router.post("/create", joinBatch, createUser); // to create new user
router.delete("/:id", auth, deleteUser); // to delete user
router.patch("/:id", auth, updateUser); // to update user info
router.post("/bulk", upload.single("file"), uploadBulkUser);
router.get("/single", getSingleData);
router.post("/create-student", joinBatch, createStudent);
export default router;
