import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

// Get all posts
router.get("/", async (req, res) => {
  // Retrieve all posts
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// Get a specific post
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// Submit a post
router.post("/", async (req, res) => {
  // Receiving post from request
  const post = new Post({
    title: req.body.title,
    message: req.body.message,
    creator: req.body.creator,
    tags: req.body.tags,
    likeCount: req.body.likeCount,
    createdAt: req.body.createdAt,
  });

  // Save post to db
  try {
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// Delete a post
router.delete("/:postId", async (req, res) => {
  try {
    const deletedPost = await Post.remove({ _id: req.params.postId });
    res.status(200).json(deletedPost);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// Update the title of a post
router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

export default router;
