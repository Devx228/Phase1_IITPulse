import mongoose from "mongoose";
import { PERMISSIONS } from "../utils/constants.js";
export const permission = async function (req, res, next) {
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
    const { permissions: userPermissions, userType } = user;
    const { method, url } = req;

    if (userType === "superAdmin") {
      next();
      return;
    }
    if (!hasPermission(method, url, userPermissions)) {
      return res.status(401).json({
        status: "error",
        message: "user does not have permission",
      });
    }
  } catch (error) {}
};

function hasPermission(method, url, userPermissions) {
  switch (method) {
    case "GET": {
      if (url.includes("student") && userPermissions[PERMISSIONS.TEST.READ]) {
        return true;
      }
      return false;
    }
    case "POST": {
    }

    default:
      break;
  }
}
