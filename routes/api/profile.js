const express = require("express");
const authMiddleware = require("../../middleware/auth");
const ProfileModel = require("../../models/Profile");

const router = express.Router();

// @route  | GET api/profile/me
// @desc   | Endpoint untuk mendapatkan profile user saat ini
// @access | Private
router.get("/me", authMiddleware, async (req, res) => {
  try {
    // Mengambil data profile sekaligus menghubungkan dengan data user (mirip join)
    const profile = await ProfileModel.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    // Jika profile tidak tersedia
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
