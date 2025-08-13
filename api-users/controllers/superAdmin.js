import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import SuperAdminUser from "../models/SuperAdmin.model.js";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";
const router = express.Router();
dotenv.config();

const key = process.env.AUTH_KEY;
export const getSingleData = async (req, res) => {
  try {
    const id = req.query.id;
    const singleUser = await SuperAdminUser.findOne(
      {
        _id: id,
        userType: "superadmin",
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
    const getUsers = await SuperAdminUser.find({ userType: "superadmin" });

    const mappedResult = getUsers
      .map((mongoObj) => mongoObj.toObject())
      .map((user) => ({
        ...user,
        id: user._id,
      }));

    if (!getUsers) {
      return res.status(404).json({ message: "No super-admin users found." });
    }

    res.status(200).json(mappedResult);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = await SuperAdminUser.findOne({ email });

    if (newUser) {
      return res
        .status(400)
        .json({ message: "Super Admin User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await SuperAdminUser.create({
      ...req.body,
      password: hashedPassword,
      _id: `IITP_S_AD_${uuid().replace(/-/g, "_")}`,
    });

    res
      .status(200)
      .json({ result, message: "Supper Admin user created successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No user with id: ${id}`);

    await SuperAdminUser.findByIdAndRemove(id);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, contact, institute, gender, roles, modifiedAt } = req.body; // only four fields can be updated here

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`Invalid User id ${id}`);

    const updatedUser = {
      name,
      contact,
      institute,
      gender,
      roles,
      modifiedAt,
    };

    await SuperAdminUser.findByIdAndUpdate(id, updatedUser, { new: true });

    res.json(updateUser);
  } catch (error) {
    res.status(404).status({ message: error.message });
  }
};

export default router;
