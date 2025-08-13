import Otp from "../models/Otp.model.js";
import axios from "axios";
import { getUser } from "../controllers/users.js";
import StudentUser from "../models/Student.model.js";
import OperatorUser from "../models/Operator.model.js";
import ManagerUser from "../models/Manager.model.js";
import TeacherUser from "../models/Teacher.model.js";
import SuperAdminUser from "../models/SuperAdmin.model.js";

export const generateOtp = async function (req, res, next) {
  const newUser = await StudentUser.findOne({ contact: req.body.number });
  console.log("NEW USER", newUser);
  if (newUser?._doc) {
    return res.status(400).json({ message: "Student User already exists" });
  }

  // const newUser2 = await OperatorUser.findOne({ number: req.body.number });
  // console.log("hello 1");
  // if (newUser2?._doc) {
  //   return res.status(400).json({ message: "Student User already exists" });
  // }

  // const newUser3 = await ManagerUser.findOne({ number: req.body.number });
  // console.log("hello 1");
  // if (newUser3?._doc) {
  //   return res.status(400).json({ message: "Student User already exists" });
  // }

  // const newUser4 = await TeacherUser.findOne({ number: req.body.number });
  // console.log("hello 1");
  // if (newUser4?._doc) {
  //   return res.status(400).json({ message: "Student User already exists" });
  // }

  // const newUser5 = await SuperAdminUser.findOne({ number: req.body.number });
  // console.log("hello 1");
  // if (newUser5?._doc) {
  //   return res.status(400).json({ message: "Student User already exists" });
  // }

  try {
    let alreadyExists = await Otp.findOne({ number: req.body.number });
    if (alreadyExists) {
      await Otp.findOneAndDelete({ number: req.body.number });
    }
    const { number } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);
    const newOtp = new Otp({
      number,
      otp,
      expiryDate: new Date().getTime() + 10 * 60 * 1000,
    });
    console.log(otp);
    await newOtp.save();
    console.log("NEW OTP", newOtp);
    const ress = await axios.get(
      `https://www.smsgatewayhub.com/api/mt/SendSMS?APIKey=Lq6noBVaZ06378nv1Gzf2A&senderid=IITPLS&channel=2&DCS=0&flashsms=0&number=${number}&text=Hello%20student,Your%20OTP%20for%20new%20registration%20is%20${otp}%20,%20please%20do%20not%20share%20and%20do%20not%20refresh%20the%20page%20after%20submitting.%20-IITPULSE&route=1`
    );
    return res.status(201).json({ message: "Otp generated successfully" }); // Hello student,Your OTP for new registration is {#var#} , please do not share and do not refresh the page after submitting. -IITPULSE
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
};
export const verifyOtp = async function (req, res) {
  try {
    const { number, otp } = req.body;
    const alreadyExists = await Otp.findOne({ number, otp });
    if (alreadyExists) {
      await Otp.findOneAndDelete({ number: req.body.number });
      if (Number(alreadyExists.expiryDate) < new Date().getTime()) {
        return res.status(404).json({ message: "Otp expired" });
      }
      const response = await StudentUser.updateOne(
        {
          contact: number,
        },
        { $set: { isPhoneVerified: true } }
      );
      console.log(response);
      return res.status(200).json({ message: "Otp verified successfully" });
    } else {
      return res.status(404).json({ message: "Otp not verified" });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const checkOtp = async function (req, res, next) {
  const id = req.body._id;
  const user = await StudentUser.findOne({ _id: id });
  const isPhoneAuthenticated = user.isPhoneVerified;
  res.status(200).json({ isPhoneAuthenticated });
};
