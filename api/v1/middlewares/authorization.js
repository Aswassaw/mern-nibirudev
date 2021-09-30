const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/default");

const authorization = (req, res, next) => {
  // Mendapatkan token dari header
  const token = req.header("x-auth-token");

  // Mengecek apakah token ada atau tidak
  if (!token)
    return res
      .status(401)
      .json({ errors: [{ msg: "No token, Authorization denied" }] });

  // Menverifikasi token
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Mengisi request dengan hasil decode jwt token
    req.user = decoded.user;

    next();
  } catch (err) {
    res
      .status(401)
      .json({ errors: [{ msg: "Token is not valid, Authorization failed" }] });
  }
};

module.exports = authorization;
