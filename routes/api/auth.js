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

// @route  | POST api/auth/register
// @desc   | Endpoint untuk mendaftarkan user baru
// @access | Public
router.post("/register", registerValidation, registerController);

// @route  | POST api/auth/register
// @desc   | Endpoint untuk login dan mendapatkan jwt token
// @access | Public
router.post("/login", loginValidation, loginController);

// @route  | GET api/auth/register
// @desc   | Endpoint untuk medapatkan data user
// @access | Private
router.get("/", authMiddleware, getUserController);

module.exports = router;
