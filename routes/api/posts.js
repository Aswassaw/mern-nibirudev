const express = require("express");
const authMiddleware = require("../../middleware/auth");
const {
  postNewPost,
  getAllPosts,
  getPostById,
  deletePostById,
  putLikePost,
  putUnlikePost,
  putCommentPost,
  deleteCommentPost,
} = require("../../controllers/posts");
const {
  postNewPostValidation,
  putCommentPostValidation,
} = require("../../validation/posts");

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

// @route  | PUT api/posts/like/:post_id
// @desc   | Like a post
// @access | Private
router.put("/like/:post_id", authMiddleware, putLikePost);

// @route  | PUT api/posts/unlike/:post_id
// @desc   | Unlike a post
// @access | Private
router.put("/unlike/:post_id", authMiddleware, putUnlikePost);

// @route  | PUT api/posts/comment/:post_id
// @desc   | Comment a post
// @access | Private
router.put(
  "/comment/:post_id",
  [authMiddleware, putCommentPostValidation],
  putCommentPost
);

// @route  | DELETE api/posts/comment/:post_id/:comment_id
// @desc   | Delete comment a post
// @access | Private
router.delete("/comment/:post_id/:comment_id", authMiddleware, deleteCommentPost);

module.exports = router;
