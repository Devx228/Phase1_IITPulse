import xlsx from "xlsx";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import {
  StudentUser,
  AdminUser,
  TeacherUser,
  ManagerUser,
  OperatorUser,
  SuperAdminUser,
} from "../models/index.js";

export const uploadBulkUser = async (req, res) => {
  try {
    const workBook = xlsx.readFile(req.file.path);

    const workSheet = workBook.Sheets["Sheet1"];

    const data = xlsx.utils.sheet_to_json(workSheet);

    const createdBy = req.createdBy;

    async function generateHash(item) {
      const hashedPassword = await bcrypt.hash(item.password, 12);
      return { ...item, password: hashedPassword };
    }
    const result = [];

    async function prepareData() {
      await Promise.all(data.map((item) => generateHash(item))).then(
        (values) => {
          //console.log(values);
          values.forEach((value) => {
            let finalData = value;
            //console.log(finalData);
            finalData._id = `IITP_ST_${uuid().replace(/-/g, "_")}`;
            finalData.attemptedTests = [];
            finalData.validity = {
              from: new Date().toISOString(),
              to: new Date(
                new Date().setDate(new Date().getDate() + 400)
              ).toISOString(),
            };

            finalData.roles = finalData.roles
              .replace(/ /g, "")
              .split(",")
              .map((Role) => `ROLE_${Role.toUpperCase()}`);
            finalData.roles = finalData.roles.map((Role) => ({
              id: Role,
              from: new Date().toISOString(),
              to: new Date(
                new Date().setDate(new Date().getDate() + 400)
              ).toISOString(),
            }));
            finalData.contact = parseInt(finalData.contact);
            finalData.parentDetails = {
              name: finalData.parentDetailsName,
              contact: parseInt(finalData.parentDetailsContact),
            };
            delete finalData.parentDetailsContact;
            delete finalData.parentDetailsName;
            finalData.createdBy = createdBy;

            result.push(finalData);
          });
        }
      );
      const user = await StudentUser.insertMany(result);
      // if (result[0].userType == "student") {
      //   const user = await StudentUser.insertMany(result);
      // } else if (result[0].userType == "teacher") {
      //   const user = await TeacherUser.insertMany(result);
      // } else if (result[0].userType == "admin") {
      //   const user = await AdminUser.insertMany(result);
      // }
    }
    prepareData();
    res.status(200).json({ message: "users created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
