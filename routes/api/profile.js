const express = require("express");
const authMiddleware = require("../../middleware/auth");
const {
  postCurrentProfileValidation,
  putProfileExperienceValidation,
  putProfileEducationValidation,
} = require("../../validation/profile");
const {
  getCurrentProfile,
  postCurrentProfile,
  getAllProfile,
  getProfileByUserId,
  deleteUserById,
  putProfileExperience,
  deleteProfileExperience,
  putProfileEducation,
  deleteProfileEducation,
} = require("../../controllers/profile");

const router = express.Router();

// @route  | GET api/profile/me
// @desc   | Endpoint untuk mendapatkan profile current user
// @access | Private
router.get("/me", authMiddleware, getCurrentProfile);

// @route  | POST api/profile
// @desc   | Endpoint untuk membuat atau mengubah profile current user
// @access | Private
router.post(
  "/",
  [authMiddleware, postCurrentProfileValidation],
  postCurrentProfile
);

// @route  | GET api/profile
// @desc   | Endpoint untuk mendapatkan semua profile
// @access | Public
router.get("/", getAllProfile);

// @route  | GET api/profile/user/:user_id
// @desc   | Endpoint untuk mendapatkan profile user berdasarkan id
// @access | Public
router.get("/user/:user_id", getProfileByUserId);

// @route  | DELETE api/profile/user/:user_id
// @desc   | Endpoint untuk menghapus profile, user, and post
// @access | Private
router.delete("/user/:user_id", authMiddleware, deleteUserById);

// @route  | PUT api/profile/experience
// @desc   | Endpoint untuk menambah profile experience
// @access | Private
router.put(
  "/experience",
  [authMiddleware, putProfileExperienceValidation],
  putProfileExperience
);

// @route  | DELETE api/profile/experience/:exp_id
// @desc   | Endpoint untuk menghapus profile experience berdasarkan id experience
// @access | Private
router.delete("/experience/:exp_id", authMiddleware, deleteProfileExperience);

// @route  | PUT api/profile/education
// @desc   | Endpoint untuk menambah profile education
// @access | Private
router.put(
  "/education",
  [authMiddleware, putProfileEducationValidation],
  putProfileEducation
);

// @route  | DELETE api/profile/education/:edu_id
// @desc   | Endpoint untuk menghapus profile education berdasarkan id education
// @access | Private
router.delete("/education/:edu_id", authMiddleware, deleteProfileEducation);

module.exports = router;
