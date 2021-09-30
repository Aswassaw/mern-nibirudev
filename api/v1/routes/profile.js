const express = require("express");
const authorization = require("../middlewares/authorization");
const verified = require("../middlewares/verified");
const {
  postCurrentProfileValidation,
  postProfileExperienceValidation,
  postProfileEducationValidation,
} = require("../validations/profile");
const {
  postCurrentProfile,
  getAllProfile,
  getCurrentProfile,
  deleteCurrentProfile,
  getProfileByUserId,
  postProfileExperience,
  deleteProfileExperience,
  postProfileEducation,
  deleteProfileEducation,
  getGithubRepo,
} = require("../controllers/profile");

const router = express.Router();

// @route  | POST v1/profile
// @desc   | Create current user profile
// @access | Private
router.post(
  "/",
  [authorization, verified, postCurrentProfileValidation],
  postCurrentProfile
);

// @route  | GET v1/profile
// @desc   | Get all profile
// @access | Public
router.get("/", getAllProfile);

// @route  | GET v1/profile/me
// @desc   | Get current user profile
// @access | Private
router.get("/me", authorization, getCurrentProfile);

// @route  | DELETE v1/profile/me
// @desc   | Delete current user profile
// @access | Private
router.delete("/me", [authorization, verified], deleteCurrentProfile);

// @route  | GET v1/profile/user/:user_id
// @desc   | Get profile by id
// @access | Public
router.get("/user/:user_id", getProfileByUserId);

// @route  | POST v1/profile/experience
// @desc   | Create experience
// @access | Private
router.post(
  "/experience",
  [authorization, verified, postProfileExperienceValidation],
  postProfileExperience
);

// @route  | DELETE v1/profile/experience/:exp_id
// @desc   | Delete experience by id
// @access | Private
router.delete(
  "/experience/:exp_id",
  [authorization, verified],
  deleteProfileExperience
);

// @route  | POST v1/profile/education
// @desc   | Create education
// @access | Private
router.post(
  "/education",
  [authorization, verified, postProfileEducationValidation],
  postProfileEducation
);

// @route  | DELETE v1/profile/education/:edu_id
// @desc   | Delete education by id
// @access | Private
router.delete(
  "/education/:edu_id",
  authorization,
  verified,
  deleteProfileEducation
);

// @route  | GET v1/profile/github/:username
// @desc   | Get github repo by github username
// @access | Public
router.get("/github/:username", getGithubRepo);

module.exports = router;
