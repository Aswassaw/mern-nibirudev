const User = require("../models/User");
const Profile = require("../models/Profile");
const Post = require("../models/Post");
const Token = require("../models/Token");

// Controller: v1/user/me
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Controller: v1/user/me
const deleteCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    await Token.findOneAndRemove({ email: user.email });
    await Post.deleteMany({ user: req.user.id });
    await Profile.findOneAndRemove({ user: req.user.id });
    await user.remove();

    return res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

module.exports = { getCurrentUser, deleteCurrentUser };
