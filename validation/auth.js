const { check } = require("express-validator");

// Validasi untuk endpoint: api/auth/register
const registerValidation = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password require 6 or more characters").isLength({
    min: 6,
  }),
];

// Validasi untuk endpoint: api/auth/login
const loginValidation = [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").not().isEmpty(),
];

module.exports = { registerValidation, loginValidation };
