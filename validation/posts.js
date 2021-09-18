const { check } = require("express-validator");

// Validasi untuk endpoint: POST api/posts
const postNewPostValidation = [
  check("text", "Text is required").not().isEmpty(),
];

// Validasi untuk endpoint: PUT api/posts/comment/:post_id/:comment_id
const putCommentPostValidation = [
  check("text", "Text is required").not().isEmpty(),
];

module.exports = {
  postNewPostValidation,
  putCommentPostValidation,
};
