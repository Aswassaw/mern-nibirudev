const express = require("express");
const authorization = require("../middlewares/authorization");
const { registerValidation, loginValidation } = require("../validations/auth");
const { register, login, verify, resendVerify } = require("../controllers/auth");

const router = express.Router();

// @route  | POST v1/auth/register
// @desc   | Register
// @access | Public
router.post("/register", registerValidation, register);

// @route  | POST v1/auth/login
// @desc   | Login
// @access | Public
router.post("/login", loginValidation, login);

// @route  | POST v1/auth/verify
// @desc   | Verify registration
// @access | Public
router.post("/verify", verify)

// @route  | POST v1/auth/verify/resend
// @desc   | Resend verify token
// @access | Private
router.post('/verify/resend', authorization, resendVerify);

module.exports = router;
