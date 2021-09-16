const express = require("express");
const authMiddleware = require("../../middleware/auth");
const { postCurrentProfileValidation } = require("../../validation/profile");
const {
  getCurrentProfileController,
  postCurrentProfileController,
  getAllProfileController,
  getProfileByUserId,
} = require("../../controllers/profile");

const router = express.Router();

// @route  | GET api/profile/me
// @desc   | Endpoint untuk mendapatkan profile current user
// @access | Private
router.get("/me", authMiddleware, getCurrentProfileController);

// @route  | POST api/profile
// @desc   | Endpoint untuk membuat atau mengubah profile current user
// @access | Private
router.post(
  "/",
  [authMiddleware, postCurrentProfileValidation],
  postCurrentProfileController
);

// @route  | GET api/profile
// @desc   | Endpoint untuk mendapatkan semua profile
// @access | Public
router.get("/", getAllProfileController);

// @route  | GET api/profile/user/:user_id
// @desc   | Endpoint untuk mendapatkan profile user berdasarkan id
// @access | Public
router.get("/user/:user_id", getProfileByUserId);

module.exports = router;
