import jwt, { decode } from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(500).json({ message: "authorization missing" });
    }
    const token = req.headers.authorization.split("Bearer ")[1];
    const isCustomAuth = token.length < 500; // token > 500 = Google Oauth OR token < 500 = local Auth

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.AUTH_KEY);

      req.userId = decodedData.id;
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default auth;
