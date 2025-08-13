import express from "express";
import { parseDocx } from "../controllers/utils.js";
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

const router = express.Router();

router.post("/parse-docx", upload.single("file"), parseDocx);

export default router;
