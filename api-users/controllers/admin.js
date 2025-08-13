import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import AdminUser from "../models/Admin.model.js";
import Role from "../models/Role.model.js";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { checkIfValidUUID } from "../utils/utils.js";
const router = express.Router();
dotenv.config();

const key = process.env.AUTH_KEY;

export const getSingleData = async (req, res) => {
  try {
    const id = req.query.id;
    const singleUser = await AdminUser.findOne(
      {
        _id: id,
        userType: "admin",
      },
      { password: 0 }
    );
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getData = async (req, res) => {
  try {
    const getUsers = await AdminUser.find(
      { userType: "admin" },
      { password: 0 }
    );

    const mappedResult = getUsers
      .map((mongoObj) => mongoObj.toObject())
      .map((user) => ({
        ...user,
        id: user._id,
      }));

    if (!getUsers) {
      return res.status(404).json({ message: "No admin users found." });
    }

    res.status(200).json(mappedResult);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = await AdminUser.findOne({ email });

    if (newUser) {
      return res.status(400).json({ message: "Admin User alredy exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await AdminUser.create({
      ...req.body,
      password: hashedPassword,
      _id: `IITP_AD_${uuid().replace(/-/g, "_")}`,
    });
    const roles = req.body.roles;
    const resul = Promise.all(
      roles.map(async (role) => {
        return await Role.findByIdAndUpdate(role.id, {
          $push: {
            members: {
              id: result?._id,
              name: result.name,
            },
          },
        });
      })
    );
    console.log("result", resul);
    res
      .status(200)
      .json({ result, message: "Admin user created successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await AdminUser.findOne({ _id: id });
    if (!user) return res.status(404).send(`No user with id: ${id}`);

    await AdminUser.findByIdAndRemove(id);
    res.json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  // we can only update things which not affect the model of
  // perticular user type

  try {
    const { id } = req.params;
    console.log("iddddddddddddddddddddddd", id);
    const { name, contact, institute, validity, roles, modifiedAt, gender } =
      req.body;
    console.log(req.body);
    // if (!checkIfValidUUID(id))
    //   return res.status(404).send(`Invalid User id ${id}`);
    const user = await AdminUser.findOne({ _id: id });
    if (!user) return res.status(404).send(`No user with id: ${id}`);

    const updatedUser = {
      name,
      contact,
      institute,
      validity,
      roles,
      modifiedAt,
      gender,
    };

    await AdminUser.findByIdAndUpdate(id, updatedUser, { new: true });

    res.json(updateUser);
  } catch (error) {
    console.log(error);
    res.status(404).status({ message: error.message });
  }
};

export default router;
