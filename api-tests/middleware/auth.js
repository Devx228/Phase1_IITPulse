import jwt from "jsonwebtoken";

const AUTH_KEY = process.env.AUTH_KEY || "SECRET_KUCH_BHI";

const auth = async (req, res, next) => {
  // console.log(AUTH_KEY);
  try {
    if (!req.headers.authorization) {
      return res.status(500).json({ message: "authorization missing" });
    }
    const token = req.headers.authorization.split("Bearer ")[1];
    const isCustomAuth = token.length < 500; // token > 500 = Google Oauth OR token < 500 = local Auth

    let decodedData;

    if (token) {
      decodedData = jwt.verify(token, AUTH_KEY);

      req.user = {
        id: decodedData?.id,
        email: decodedData?.email,
        userType: decodedData?.userType,
      };
      req.userId = decodedData.id;
      req.token = req.headers["authorization"];
    }
    console.log("Req", req);
    console.log("Res", res);

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
