import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import ManagerUser from "../models/Manager.model.js";
import { Validity } from "../utils/index.js";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";

import Role from "../models/Role.model.js";
const router = express.Router();
dotenv.config();

const key = process.env.AUTH_KEY;
export const getSingleData = async (req, res) => {
  try {
    const id = req.query.id;
    const singleUser = await ManagerUser.findOne(
      {
        _id: id,
        userType: "manager",
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
    const getUsers = await ManagerUser.find(
      { userType: "manager" },
      { password: 0 }
    );

    const mappedResult = getUsers
      .map((mongoObj) => mongoObj.toObject())
      .map((user) => ({
        ...user,
        id: user._id,
      }));

    if (!getUsers) {
      return res.status(404).json({ message: "No manager users found." });
    }

    res.status(200).json(mappedResult);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = await ManagerUser.findOne({ email });

    if (newUser) {
      return res.status(400).json({ message: "Manager User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 12); // encrypting password

    const result = await ManagerUser.create({
      ...req.body,
      password: hashedPassword,
      _id: `IITP_M_${uuid().replace(/-/g, "_")}`,
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
    res
      .status(200)
      .json({ result, message: "Manager User created successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await ManagerUser.findOne({ _id: id });
    if (!user) return res.status(404).send(`No user with id: ${id}`);

    await ManagerUser.findByIdAndRemove(id);
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
    const { name, contact, institute, gender, validity, roles, modifiedAt } =
      req.body; // only six fields can be updated here

    const user = await ManagerUser.findOne({ _id: id });
    if (!user) return res.status(404).send(`No user with id: ${id}`);

    const updatedUser = {
      name,
      contact,
      institute,
      gender,
      validity,
      roles,
      modifiedAt,
    };

    await ManagerUser.findByIdAndUpdate(id, updatedUser, { new: true });

    res.json(updateUser);
  } catch (error) {
    res.status(404).status({ message: error.message });
  }
};

export default router;
