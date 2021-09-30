const { validationResult } = require("express-validator");
const User = require("../models/User");
const Post = require("../models/Post");

// Controller: v1/posts
const postNewPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);

  try {
    const user = await User.findById(req.user.id).select("-password");

    const newPost = new Post({
      user: req.user.id,
      text: req.body.text,
    });
    // Saving to db
    await newPost.save();

    res.json({ msg: "Post uploaded" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Controller: v1/posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ date: -1 })
      .populate("user", ["name", "avatar"]);

    // Populate likes dan comments
    for (let i = 0; i < posts.length; i++) {
      for (let j = 0; j < posts[i].comments.length; j++) {
        await posts[i].populate(`comments.${i}.user`, ["name", "avatar"]);
      }
      for (let j = 0; j < posts[i].likes.length; j++) {
        await posts[i].populate(`likes.${i}.user`, ["name", "avatar"]);
      }
    }

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Controller: v1/posts/:post_id
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id).populate("user", [
      "name",
      "avatar",
    ]);
    for (let i = 0; i < post.comments.length; i++) {
      await post.populate(`comments.${i}.user`, ["name", "avatar"]);
    }
    for (let i = 0; i < post.likes.length; i++) {
      await post.populate(`likes.${i}.user`, ["name", "avatar"]);
    }

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
};

// Controller: v1/posts/:post_id
const deletePostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "You're not Authorized" });
    }

    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
};

// Controller: v1/posts/:post_id/like
const postLikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check if post already been liked by current user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();

    res.json({ msg: "Post liked" });
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
};

// Controller: v1/posts/:post_id/like
const deleteLikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check if post already been liked by current user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }

    // Get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json({ msg: "Post unliked" });
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
};

// Controller: v1/posts/:post_id/comment
const postCommentPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);

  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const newComment = {
      text: req.body.text,
      user: req.user.id,
    };

    post.comments.unshift(newComment);
    await post.save();

    res.json({ msg: "Comment uploaded" });
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
};

// Controller: v1/posts/:post_id/comment/:comment_id
const deleteCommentPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // If comment doesn't exist
    if (!comment) return res.status(404).json({ msg: "Comment not found" });

    // Check user
    if (comment.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "You're not Authorized" });

    // Get remove index
    const removeIndex = post.comments
      .map((comment) => comment.id)
      .indexOf(req.params.comment_id);
    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json({ msg: "Comment deleted" });
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
};

module.exports = {
  postNewPost,
  getAllPosts,
  getPostById,
  deletePostById,
  postLikePost,
  deleteLikePost,
  postCommentPost,
  deleteCommentPost,
};
