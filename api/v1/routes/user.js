const express = require("express");
const authorization = require("../middlewares/authorization");
const { getCurrentUser, deleteCurrentUser } = require("../controllers/user");

const router = express.Router();

// @route  | GET v1/user/me
// @desc   | Get current user
// @access | Private
router.get("/me", authorization, getCurrentUser);

// @route  | DELETE v1/user/me
// @desc   | Delete current user
// @access | Private
router.delete("/me", authorization, deleteCurrentUser);

module.exports = router;
