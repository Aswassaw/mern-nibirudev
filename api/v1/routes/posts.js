const express = require("express");
const authorization = require("../middlewares/authorization");
const verified = require("../middlewares/verified");
const {
  postNewPost,
  getAllPosts,
  getPostById,
  deletePostById,
  postLikePost,
  deleteLikePost,
  postCommentPost,
  deleteCommentPost,
} = require("../controllers/posts");
const {
  postNewPostValidation,
  postCommentPostValidation,
} = require("../validations/posts");

const router = express.Router();

// @route  | POST v1/posts
// @desc   | Create post
// @access | Private
router.post("/", [authorization, verified, postNewPostValidation], postNewPost);

// @route  | GET v1/posts
// @desc   | Get all post
// @access | Private
router.get("/", authorization, getAllPosts);

// @route  | GET v1/posts/:post_id
// @desc   | Get post by id
// @access | Private
router.get("/:post_id", authorization, getPostById);

// @route  | DELETE v1/posts/:post_id
// @desc   | Delete post by id
// @access | Private
router.delete("/:post_id", [authorization, verified], deletePostById);

// @route  | POST v1/posts/:post_id/like
// @desc   | Like a post
// @access | Private
router.post("/:post_id/like", [authorization, verified], postLikePost);

// @route  | DELETE v1/posts/:post_id/like
// @desc   | Unlike a post
// @access | Private
router.delete("/:post_id/like", [authorization, verified], deleteLikePost);

// @route  | POST v1/posts/:post_id/comment
// @desc   | Comment a post
// @access | Private
router.post(
  "/:post_id/comment",
  [authorization, verified, postCommentPostValidation],
  postCommentPost
);

// @route  | DELETE v1/posts/:post_id/comment/:comment_id
// @desc   | Delete comment a post by id
// @access | Private
router.delete(
  "/:post_id/comment/:comment_id",
  authorization,
  deleteCommentPost
);

module.exports = router;
