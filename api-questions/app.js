import express from "express";
import mongoose from "mongoose";
import {
  mcqRoutes,
  numericalRoutes,
  paragraphRoutes,
  sourceRoutes,
  subjectRoute,
  matrixRoutes,
  utilsRoutes,
} from "./routes/index.js";
import dotenv from "dotenv";
import cors from "cors";
import { toggleProofReadQuestion } from "./controllers/miscelleaneous.js";
const app = express();
app.use(cors({origin:"*"}));
dotenv.config();
app.use(
  express.json({
    limit: "50mb",
  })
);

app.patch("/toggleproofread", toggleProofReadQuestion);
app.use("/mcq", mcqRoutes);
app.use("/numerical", numericalRoutes);
app.use("/paragraph", paragraphRoutes);
app.use("/matrix", matrixRoutes);
app.use("/subject", subjectRoute);
app.use("/source", sourceRoutes);
app.use("/utils", utilsRoutes);
//app.use("/miscelleaneous", miscelleaneousRoute);
const DB_NAME = "IITP";

const DATABASE_URL = process.env.DB_URI;

mongoose.connect(`${DATABASE_URL}`);

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.status(200).json({
    status: "Questions running",
  });
});

app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});
