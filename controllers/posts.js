const { validationResult } = require("express-validator");
const User = require("../models/User");
const Profile = require("../models/Profile");
const Post = require("../models/Post");

// Controller untuk endpoint: POST api/posts
const postNewPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);

  try {
    const user = await User.findById(req.user.id).select("-password");

    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      userId: req.user.id,
    });
    // Saving to db
    await newPost.save();

    res.json(newPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Controller untuk endpoint: GET api/posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }).populate();

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Controller untuk endpoint: GET api/posts/:post_id
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id).populate("userId", [
      "name",
      "avatar",
    ]);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
};

// Controller untuk endpoint: DELETE api/posts/:post_id
const deletePostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check user
    if (post.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not Authorized" });
    }

    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
};

// Controller untuk endpoint: PUT api/posts/like/:post_id
const putLikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check if post already been liked by current user
    if (
      post.likes.filter((like) => like.userId.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({ userId: req.user.id });
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Controller untuk endpoint: PUT api/posts/unlike/:post_id
const putUnlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check if post already been liked by current user
    if (
      post.likes.filter((like) => like.userId.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }

    // Get remove index
    const removeIndex = post.likes
      .map((like) => like.userId.toString())
      .indexOf(req.user.post_id);
    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  postNewPost,
  getAllPosts,
  getPostById,
  deletePostById,
  putLikePost,
  putUnlikePost,
};
