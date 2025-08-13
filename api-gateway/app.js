import express from "express";
import proxy from "express-http-proxy";
import cors from "cors";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

// app.get("/", (req, res) => {
//   res.status(200).json({ status: "Gateway running on PORT " + PORT });
// });

app.use("/users", proxy("http://usersserver:8001"));
app.use("/questions", proxy("http://questionsserver:8002"));
app.use("/tests", proxy("http://testsserver:8003"));

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.status(200).json({
    status: "Gateway running",
  });
});

app.listen(PORT, () => {
  console.log(`Gateway server is running on port ${PORT}`);
});
