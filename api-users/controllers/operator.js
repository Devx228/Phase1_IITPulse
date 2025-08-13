import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import OperatorUser from "../models/Operator.model.js";

import Role from "../models/Role.model.js";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";
const router = express.Router();
dotenv.config();

const key = process.env.AUTH_KEY;
export const getSingleData = async (req, res) => {
  try {
    const id = req.query.id;
    const singleUser = await OperatorUser.findOne(
      {
        _id: id,
        userType: "operator",
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
    const getUsers = await OperatorUser.find(
      { userType: "operator" },
      { password: 0 }
    );

    const mappedResult = getUsers
      .map((mongoObj) => mongoObj.toObject())
      .map((user) => ({
        ...user,
        id: user._id,
      }));

    if (!getUsers) {
      return res.status(404).json({ message: "No operator users found." });
    }

    res.status(200).json(mappedResult);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = await OperatorUser.findOne({ email });

    if (newUser) {
      return res.status(400).json({ message: "Operator User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 12); // encrypting password

    const result = await OperatorUser.create({
      ...req.body,
      password: hashedPassword,
      _id: `IITP_OP_${uuid().replace(/-/g, "_")}`,
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
      .json({ result, message: "Operator user created successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await OperatorUser.findOne({ _id: id });
    if (!user) return res.status(404).send(`No user with id: ${id}`);

    await OperatorUser.findByIdAndRemove(id);
    res.json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      contact,
      modifiedAt,
      QuestionBank,
      validity,
      address,
      gender,
      institute,
      roles,
    } = req.body;
    const user = await OperatorUser.findOne({ _id: id });
    if (!user) return res.status(404).send(`No user with id: ${id}`);

    const updatedUser = {
      name,
      contact,
      modifiedAt,
      QuestionBank,
      validity,
      address,
      gender,
      institute,
      roles,
    };

    await OperatorUser.findByIdAndUpdate(id, updatedUser, { new: true });

    res.json(updateUser);
  } catch (error) {
    res.status(404).status({ message: error.message });
  }
};

export default router;
