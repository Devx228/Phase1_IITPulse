import express from "express";
const routes = express.Router();
import {
  createInstitute,
  getInstitute,
  updateInstitute,
  deleteInstitute,
} from "../controllers/institute.js";

routes.post("/create", createInstitute);
routes.get("/get", getInstitute);
routes.put("/update", updateInstitute);
routes.delete("/delete", deleteInstitute);

export default routes;
