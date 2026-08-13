const jwt = require("jsonwebtoken");

const verifyToken = (
  req,
  res,
  next
) => {

  try {

    console.log("=================================");
    console.log("Authorization Header:", req.headers.authorization);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    const authHeader =
      req.headers.authorization;

    if (!authHeader) {

      return res.status(401).json({
        success: false,
        message: "Token Required"
      });

    }

    const token =
      authHeader.split(" ")[1];

    console.log("Token:", token);

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    console.log("Decoded:", decoded);

    req.user = decoded;

    next();

  } catch (error) {

    console.log("JWT ERROR:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid Token"
    });

  }

};

module.exports = verifyToken;