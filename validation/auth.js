const { check } = require("express-validator");

// Validasi untuk endpoint: POST api/auth/register
const registerValidation = [
  check("name", "Name is required").not().isEmpty(),
  check("name", "Name maximum length is 50 characters").isLength({
    max: 50,
  }),
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password require 6 or more characters").isLength({
    min: 8,
  }),
];

// Validasi untuk endpoint: POST api/auth/login
const loginValidation = [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").not().isEmpty(),
];

module.exports = { registerValidation, loginValidation };
