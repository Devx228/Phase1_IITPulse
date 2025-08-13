import express from "express";
import mongoose from "mongoose";
import { testRoutes, patternRoutes, examRoutes } from "./routes/index.js";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ status: "Test Server running on PORT " + PORT });
});

app.use("/test", testRoutes);
app.use("/pattern", patternRoutes);
app.use("/exam", examRoutes);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const DB_NAME = "IITP";

const DATABASE_URL = `${process.env.DB_URI}`;
// mongoose.connect(DATABASE_URL).catch(err);

mongoose.connect(DATABASE_URL, options, function (err, res) {
  try {
    console.log("Connected to Database");
  } catch (err) {
    throw err;
  }
});

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Tests server is running on port ${PORT}`);
});
