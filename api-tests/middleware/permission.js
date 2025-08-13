import mongoose from "mongoose";
import { PERMISSIONS } from "../utils/constants.js";
import axios from "axios";

export const readPermission = async function (req, res, next) {
  try {
    const { userId } = req;

    if (!userId) {
      return res.status(401).json({
        status: "error",
        message: "userId is required",
      });
    }

    const user = await mongoose.connection.db
      .collection("users")
      .findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: `user not found with id: ${userId}`,
      });
    }
    req.user = { ...req.user, name: user.name };
    const { roles, userType, token } = user;
    const { method, url } = req;
    // console.log("rleesss", roles);

    const hasPermission = await axios
      .get(`${process.env.USERS_API_URI}/roles/has-permission`, {
        params: {
          roles: roles.map((role) => role.id),
          permission: PERMISSIONS.TEST.READ,
        },
      })
      .catch((err) => {
        console.log("EEERRRR", err);
        return res.status(500).json({
          status: "error",
          message: "error while checking permission",
          data: err.response?.data,
        });
      });

    // console.log("hasPermission", hasPermission);
    if (hasPermission) {
      next();
      return;
    }
    res.status(403).json({ message: "permission deiend " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const createTestPermission = async function (req, res, next) {
  try {
    const { userId } = req;

    if (!userId) {
      return res.status(401).json({
        status: "error",
        message: "userId is required",
      });
    }

    const user = await mongoose.connection.db
      .collection("users")
      .findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: `user not found with id: ${userId}`,
      });
    }

    const { permissions, userType } = user;
    const { method, url } = req;
    if (permissions[PERMISSIONS.TEST.CREATE]) {
      next();
      return;
    }
    res.status(403).json({ message: "permission deiend " });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTestPermission = async function (req, res, next) {
  try {
    const { userId } = req;

    if (!userId) {
      return res.status(401).json({
        status: "error",
        message: "userId is required",
      });
    }

    const user = await mongoose.connection.db
      .collection("users")
      .findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: `user not found with id: ${userId}`,
      });
    }

    const { permissions, userType } = user;
    const { method, url } = req;
    if (permissions[PERMISSIONS.TEST.UPDATE]) {
      next();
      return;
    }
    res.status(403).json({ message: "permission deiend " });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTestPermission = async function (req, res, next) {
  try {
    const { userId } = req;

    if (!userId) {
      return res.status(401).json({
        status: "error",
        message: "userId is required",
      });
    }

    const user = await mongoose.connection.db
      .collection("users")
      .findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: `user not found with id: ${userId}`,
      });
    }

    const { permissions, userType } = user;
    const { method, url } = req;
    if (permissions[PERMISSIONS.TEST.DELETE]) {
      next();
      return;
    }
    res.status(403).json({ message: "permission deiend " });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
