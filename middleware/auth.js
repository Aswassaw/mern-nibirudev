const jwt = require("jsonwebtoken");
const config = require("config");

const authMiddleware = (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if there no token
  if (!token)
    return res.status(401).json({ msg: "No token, Authorization denied" });

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    // Mengisi request dengan hasil decode jwt token
    req.user = decoded.user;
    // Melanjutkan request
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid, Authorization failed" });
  }
};

module.exports = authMiddleware;
