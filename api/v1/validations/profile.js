const { check } = require("express-validator");

// Validation: api/profile
const postCurrentProfileValidation = [
  check("status", "Status is required").not().isEmpty(),
  check("skills", "Skills is required").not().isEmpty(),
];

// Validation: api/profile/experience
const postProfileExperienceValidation = [
  check("title", "Title is required").not().isEmpty(),
  check("company", "Company is required").not().isEmpty(),
  check("from", "From Date is required").not().isEmpty(),
];

// Validation: api/profile/education
const postProfileEducationValidation = [
  check("school", "School is required").not().isEmpty(),
  check("degree", "Degree is required").not().isEmpty(),
  check("fieldOfStudy", "Field Of Study is required").not().isEmpty(),
  check("from", "From Date is required").not().isEmpty(),
];

module.exports = {
  postCurrentProfileValidation,
  postProfileExperienceValidation,
  postProfileEducationValidation,
};
