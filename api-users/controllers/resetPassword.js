import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import PasswordReset from "../models/PasswordReset.model.js";

import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendResetLink(user, req, res) {
  if (!user) {
    return;
  }

  const domainURL = req.headers.origin;

  const resetToken = jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.AUTH_KEY,
    { expiresIn: "1h" }
  );

  const resetLink = `${domainURL}/reset-password?token=${encodeURIComponent(
    resetToken
  )}`;

  const hashedURI = await bcrypt.hash(resetToken, 10);

  try {
    await PasswordReset.create({
      _id: user._id,
      resetURI: hashedURI,
      email: user.email,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(new Date().getTime() + 3600000).toISOString(),
    });

    const msg = {
      to: user.email,
      from: "tech.iitpulse@gmail.com",
      subject: "Password Reset",
      html: `<h2>Password Reset</h2><br></br><p>Click on the link to reset your password:
            <a style="padding: 1.5rem 3rem; border-radius: 5px; background: green; color: white; outline: none;" href="${resetLink}" target="_blank">Reset Password</a></p>`,
    };

    // your one time password (OTP) for password reset is {#var#}. please do not share this with anyone - IITPULSE

    await sgMail.send(msg);

    console.log("Reset link sent");
    return res.status(200).json({
      status: "success",
      message: "Reset link sent",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export async function requestPasswordReset(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      status: "error",
      message: "Please provide a valid email",
    });
  }

  console.log(email);

  let userExists = await mongoose.connection.db
    .collection("users")
    .findOne({ email: email?.toLowerCase() });
  if (!userExists) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }

  try {
    await PasswordReset.deleteMany({ email });

    // let user = await mongoose.connection.db
    //     .collection("users")
    //     .findOne({ email });

    // if (!user) {
    //     return res.status(404).json({
    //         message: "User not found",
    //     });
    // }
    sendResetLink({ ...userExists }, req, res);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export async function verifyResetToken(req, res) {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({
      status: "error",
      message: "Please provide a token",
    });
  }

  try {
    const { userId, email } = jwt.verify(token, process.env.AUTH_KEY);

    if (!userId || !email) {
      return res.status(400).json({
        status: "error",
        message: "Invalid token",
      });
    }

    const user = await PasswordReset.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const isTokenValid =
      (await bcrypt.compare(token, user.resetURI)) &&
      new Date(user?.expiresAt).getTime() > new Date().getTime();
    console.log(new Date(user?.expiresAt), new Date(), user);
    if (!isTokenValid) {
      return res.status(401).json({
        status: "error",
        message: "Token expired",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Token verified",
      email,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export async function resetPassword(req, res) {
  const { newPassword, token } = req.body;

  if (!token) {
    return res.status(400).json({
      status: "error",
      message: "Please provide a token",
    });
  }

  const { userId, email } = jwt.verify(token, process.env.AUTH_KEY);

  if (!userId || !email) {
    return res.status(400).json({
      status: "error",
      message: "Invalid token",
    });
  }

  if (!email || !newPassword) {
    return res.status(400).json({
      status: "error",
      message: "Please provide a valid email and password",
    });
  }

  try {
    const passwordResetUser = await PasswordReset.findOne({ email });

    const isTokenValid =
      (await bcrypt.compare(token, passwordResetUser.resetURI)) &&
      new Date(passwordResetUser.expiresAt) > new Date();

    if (!isTokenValid) {
      return res.status(401).json({
        status: "error",
        message: "Token expired",
      });
    }

    let user = await mongoose.connection.db
      .collection("users")
      .findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await mongoose.connection.db.collection("users").updateOne(
      { email },
      {
        $set: {
          password: hashedPassword,
          updatedAt: new Date().toISOString(),
        },
      }
    );
    return res.status(200).json({
      status: "success",
      message: "Password reset successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export async function getUserDetails(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      status: "error",
      message: "Please provide a valid user id",
    });
  }

  if (!userType) {
    return res.status(400).json({
      status: "error",
      message: "Please provide a valid user type",
    });
  }

  try {
    const user = await mongoose.connection.db.collection("users").findOne(
      { _id: id, userType },
      {
        password: 0,
      }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}
