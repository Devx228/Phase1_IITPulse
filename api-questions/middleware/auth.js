import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
  try {
    const KEY = process.env.AUTH_KEY;

    if (!req.headers["authorization"]) {
      return res
        .status(500)
        .json({ status: "auth-failed", message: "Authorization Missing" });
    }
    const token = req.headers["authorization"].split("Bearer ")[1];

    const isCustomAuth = token.length < 500; // token > 500 = Google Oauth OR token < 500 = local Auth

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, KEY);

      req.userId = decodedData.id;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};
