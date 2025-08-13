import express from "express";
const routes = express.Router();
import {
  createBatch,
  getBatch,
  updateBatch,
  deleteBatch,
  getAllBatches,
} from "../controllers/batch.js";
routes.post("/create", createBatch);
routes.get("/get", getBatch);
routes.put("/update", updateBatch);
routes.delete("/delete", deleteBatch);
routes.get("/all", getAllBatches);

export default routes;
