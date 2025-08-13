import mongoose from "mongoose";

export const connectDB = async (req, res, next) => {
  try {
    await mongoose.connect(
      `${process.env.DB_URI}/${req.body.db || req.query.db}`
    );
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: error,
    });
  }
};
