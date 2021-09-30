const User = require("../models/User");

const verified = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (!user.verified)
      return res.status(400).json({ msg: "User not yet verified" });

    next();
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

module.exports = verified;
