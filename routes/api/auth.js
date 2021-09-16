const express = require("express");
const authMiddleware = require("../../middleware/auth");
const UserModel = require("../../models/User");
const router = express.Router();

// @route  | GET api/auth
// @desc   | Test route
// @access | Protected
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");

    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
