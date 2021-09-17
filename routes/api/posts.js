const express = require("express");
const authMiddleware = require("../../middleware/auth");
const { postNewPost } = require("../../controllers/posts");
const { postNewPostValidation } = require("../../validation/posts");

const router = express.Router();

// @route  | POST api/posts
// @desc   | Create new post
// @access | Provate
router.post("/", [authMiddleware, postNewPostValidation], postNewPost);

module.exports = router;
