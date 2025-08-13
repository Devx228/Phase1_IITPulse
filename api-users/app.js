import express from "express";
import cors from "cors";
import {
  superAdminRoutes,
  adminRoutes,
  teacherRoutes,
  operatorRoutes,
  managerRoutes,
  studentRoutes,
  loginRoutes,
  roleRoutes,
  batchRoutes,
  instituteRoutes,
  otpRoutes,
  emailOtpRoutes,
  passwordresetRoutes,
  usersRoutes,
  classRoutes,
} from "./routes/index.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.use("/admin", adminRoutes);
app.use("/superadmin", superAdminRoutes);
app.use("/teacher", teacherRoutes);
app.use("/operator", operatorRoutes);
app.use("/manager", managerRoutes);
app.use("/student", studentRoutes);
app.use("/auth", loginRoutes);
app.use("/roles", roleRoutes);
app.use("/batch", batchRoutes);
app.use("/institute", instituteRoutes);
app.use("/otp", otpRoutes);
app.use("/emailotp", emailOtpRoutes);
app.use("/reset-password", passwordresetRoutes);
app.use("/users", usersRoutes);
app.use("/class", classRoutes);

const PORT = process.env.PORT || 8080;

const DB_NAME = "IITP";

const DATABASE_URL = process.env.DB_URI;

mongoose.connect(`${DATABASE_URL}`);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success users",
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Users server is running on port ${PORT}`);
});
