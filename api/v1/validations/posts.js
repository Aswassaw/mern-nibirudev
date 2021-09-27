const { check } = require("express-validator");

// Validasi: v1/posts
const postNewPostValidation = [
  check("text", "Text is required").not().isEmpty(),
];

// Validasi: v1/posts/:post_id/comment
const postCommentPostValidation = [
  check("text", "Text is required").not().isEmpty(),
];

module.exports = {
  postNewPostValidation,
  postCommentPostValidation,
};
