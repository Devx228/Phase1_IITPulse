import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import AdminUser from "../models/Admin.model.js";
import StudentUser from "../models/Student.model.js";
import OperatorUser from "../models/Operator.model.js";
import ManagerUser from "../models/Manager.model.js";
import TeacherUser from "../models/Teacher.model.js";
import SuperAdminUser from "../models/SuperAdmin.model.js";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { checkIfValidUUID } from "../utils/utils.js";
const router = express.Router();
dotenv.config();

const key = process.env.AUTH_KEY;

const idAbbreviationForUserType = {
  AD: "admin",
  ST: "student",
  T: "teacher",
  M: "manager",
  OP: "operator",
  SA: "superAdmin",
};

function identifyUserTypeFromId(id) {
  const userType = id.split("_")[1];
  return idAbbreviationForUserType[userType];
}

export async function getUser(req, res) {
  try {
    console.log("Hello 1");
    const id = req.params.id;
    console.log("Hello 2");
    const userType = identifyUserTypeFromId(id);
    console.log(userType);
    switch (userType) {
      case "admin": {
        const singleUser = await AdminUser.findOne(
          {
            _id: id,
            // userType: "admin", //This condition should be present but removing it for now since all the users of all the types mostly have userType admin
          },
          { password: 0 }
        );
        if (!singleUser) {
          return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(singleUser);
      }
      case "student": {
        const singleUser = await StudentUser.findOne(
          {
            _id: id,
            // userType: "student", //This condition should be present but removing it for now since all the users of all the types mostly have userType admin
          },
          { password: 0 }
        );
        if (!singleUser) {
          return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(singleUser);
      }
      case "teacher": {
        const singleUser = await TeacherUser.findOne(
          {
            _id: id,
            // userType: "teacher", //This condition should be present but removing it for now since all the users of all the types mostly have userType admin
          },
          { password: 0 }
        );
        if (!singleUser) {
          return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(singleUser);
      }
      case "manager": {
        const singleUser = await ManagerUser.findOne(
          {
            _id: id,
            // userType: "manager", //This condition should be present but removing it for now since all the users of all the types mostly have userType admin
          },
          { password: 0 }
        );
        if (!singleUser) {
          return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(singleUser);
      }
      case "operator": {
        const singleUser = await OperatorUser.findOne(
          {
            _id: id,
            // userType: "operator", //This condition should be present but removing it for now since all the users of all the types mostly have userType admin
          },
          { password: 0 }
        );
        if (!singleUser) {
          return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(singleUser);
      }
      case "superAdmin": {
        const singleUser = await SuperAdminUser.findOne(
          {
            _id: id,
            // userType: "superAdmin", //This condition should be present but removing it for now since all the users of all the types mostly have userType admin
          },
          { password: 0 }
        );
        if (!singleUser) {
          return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(singleUser);
      }
      default: {
        return res
          .status(404)
          .json({ message: "User not found, Please check the user id" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getMultipleUsers(req, res) {
  try {
    // const { ids } = req.body;
    // const users = await User.find({ _id: { $in: ids } });
    // if (!users) {
    // return res.status(404).json({ message: "Users not found" });
    // }
    return res
      .status(200)
      .json({ message: "This is api is yet to be worked on" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
