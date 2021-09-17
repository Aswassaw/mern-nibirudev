const { check } = require("express-validator");

// Validasi untuk endpoint: POST api/profile
const postNewPostValidation = [
  check("text", "Text is required").not().isEmpty(),
];

module.exports = {
  postNewPostValidation,
};
