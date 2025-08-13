import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

function isEmpty(str) {
  return !str || 0 === str.length;
}

export const userLogin = async function (req, res, next) {
  const { email, password, phone } = req.body;
  console.log(req.body);
  if (isEmpty(email) && isEmpty(phone)) {
    return res.status(401).json({
      status: "error",
      message: "Please provide email or phone",
    });
  }
  if (isEmpty(password)) {
    return res.status(401).json({
      status: "error",
      message: "Please provide password",
    });
  }

  try {
    let user;
    if (!isEmpty(email)) {
      user = await mongoose.connection.db
        .collection("users")
        .findOne({ email });
    } else {
      user = await mongoose.connection.db
        .collection("users")
        .findOne({ contact: phone });
    }

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "error",
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
        name: user.name,
        userType: user.userType,
        instituteId: user.institute,
        roles: user.roles,
      },
      process.env.AUTH_KEY,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      status: "ok",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      status: "erorr",
      message: "server error",
    });
  }
};
