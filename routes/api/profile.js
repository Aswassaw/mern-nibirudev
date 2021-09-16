const express = require("express");
const authMiddleware = require("../../middleware/auth");
const { postCurrentProfileValidation } = require("../../validation/profile");
const {
  getCurrentProfileController,
  postCurrentProfileController,
} = require("../../controllers/profile");

const router = express.Router();

// @route  | GET api/profile/me
// @desc   | Endpoint untuk mendapatkan profile current user
// @access | Private
router.get("/", authMiddleware, getCurrentProfileController);

// @route  | POST api/profile
// @desc   | Endpoint untuk membuat atau mengubah profile current user
// @access | Private
router.post(
  "/",
  [authMiddleware, postCurrentProfileValidation],
  postCurrentProfileController
);

module.exports = router;
