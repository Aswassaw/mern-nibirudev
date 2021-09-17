const { check } = require("express-validator");

// Validasi untuk endpoint: POST api/profile
const postCurrentProfileValidation = [
  check("status", "Status is required").not().isEmpty(),
  check("skills", "Skills is required").not().isEmpty(),
];

// Validasi untuk endpoint: PUT api/profile/experience
const putProfileExperienceValidation = [
  check("title", "Title is required").not().isEmpty(),
  check("company", "Company is required").not().isEmpty(),
  check("from", "From Date is required").not().isEmpty(),
];

module.exports = { postCurrentProfileValidation, putProfileExperienceValidation };
