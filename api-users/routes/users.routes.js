import express from "express";

import { getUser, getMultipleUsers } from "../controllers/users.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", getUser); // to delete user
router.get("/multiple", auth, getMultipleUsers);

export default router;
