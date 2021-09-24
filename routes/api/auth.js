const express = require("express");
const authMiddleware = require("../../middleware/auth");
const {
  registerController,
  getUserController,
  loginController,
} = require("../../controllers/auth");
const {
  registerValidation,
  loginValidation,
} = require("../../validation/auth");

const router = express.Router();

// @route  | GET api/auth
// @desc   | Endpoint untuk mendapatkan data user
// @access | Private
router.get("/", authMiddleware, getUserController);

// @route  | POST api/auth/register
// @desc   | Endpoint untuk mendaftarkan user baru
// @access | Public
router.post("/register", registerValidation, registerController);

// @route  | POST api/auth/login
// @desc   | Endpoint untuk login dan mendapatkan jwt token
// @access | Public
router.post("/login", loginValidation, loginController);

module.exports = router;
