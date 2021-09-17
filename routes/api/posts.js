const express = require("express");
const authMiddleware = require("../../middleware/auth");
const {
  postNewPost,
  getAllPosts,
  getPostById,
  deletePostById,
} = require("../../controllers/posts");
const { postNewPostValidation } = require("../../validation/posts");

const router = express.Router();

// @route  | POST api/posts
// @desc   | Create new post
// @access | Private
router.post("/", [authMiddleware, postNewPostValidation], postNewPost);

// @route  | GET api/posts
// @desc   | Get all posts
// @access | Private
router.get("/", authMiddleware, getAllPosts);

// @route  | GET api/posts/:post_id
// @desc   | Get post by id
// @access | Private
router.get("/:post_id", authMiddleware, getPostById);

// @route  | DELETE api/posts/:post_id
// @desc   | Delete post by id
// @access | Private
router.delete("/:post_id", authMiddleware, deletePostById);

module.exports = router;
