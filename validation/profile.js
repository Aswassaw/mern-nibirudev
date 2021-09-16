const { check } = require("express-validator");

// Validasi untuk endpoint: api/profile
const postCurrentProfileValidation = [
  check("status", "Status is required").not().isEmpty(),
  check("skills", "Skills is required").not().isEmpty(),
];

module.exports = { postCurrentProfileValidation };
