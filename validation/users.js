const { check } = require("express-validator");

// Validasi for endpoint: api/users
const registerValidation = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password require 6 or more characters").isLength({
    min: 6,
  }),
];

module.exports = { registerValidation };
