import EmailOtp from "../models/EmailOtp.model.js";
// const sgMail = require('@sendgrid/mail');
import sgMail from "@sendgrid/mail"
import mongoose from "mongoose";

import StudentUser from "../models/Student.model.js";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


export const generateEmailOtp = async function (req, res, next) {
    try {
        let alreadyExists = await EmailOtp.findOne({ email: req.body.email });
        if (alreadyExists) {
            await EmailOtp.findOneAndDelete({ email: req.body.email });
        }
        const { email } = req.body;
        const user = await mongoose.connection.db
        .collection("users")
        .findOne({ email });

        if (user) {
        return res.status(404).json({
            message: "User already exist!",
        });
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        const newOtp = new EmailOtp({
            email,
            emailotp: otp,
            expiryDate: new Date().getTime() + 10 * 60 * 1000,
        });
        await newOtp.save();
        const msg = {
            to: email,
            from: 'tech.iitpulse@gmail.com',
            subject: 'Your OTP code',
            html: `<p>Your OTP code is: ${otp}</p>`,
        };
        sgMail
            .send(msg)
            .then((response) => {
                console.log(response[0].statusCode)
                console.log(response[0].headers)
            })
            .catch((error) => {
                console.error(error)
            });
        return res.status(201).json({ message: "Otp generated successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};
export const verifyEmailOtp = async function (req, res) {
    try {
        const { email, emailotp } = req.body;
        
        const alreadyExists = await EmailOtp.findOne({ email, emailotp });
        if (alreadyExists) {
            await EmailOtp.findOneAndDelete({ email: req.body.email });
            if (Number(alreadyExists.expiryDate) < new Date().getTime()) {
                return res.status(419).json({ message: "Otp expired" });
            }
            const response = await StudentUser.updateOne(
                {
                    email: email
                },
                { $set: { isEmailVerified: true } }
            );
            console.log(response)
            return res.status(200).json({ message: "Otp verified successfully" });
        } else {
            return res.status(401).json({ message: "Otp not verified" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const checkEmailOtp = async function (req, res, next) {
    const id = req.body._id
    const user = await StudentUser.findOne({ _id: id });
    const isEmailAuthenticated = user.isEmailVerified;
    res.status(200).json({ isEmailAuthenticated });

}
