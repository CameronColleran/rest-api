import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// Get a specific user
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// Create a user
router.post("/", async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    biography: req.body.biography,
    following: req.body.following,
    followers: req.body.followers,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// Delete a user
router.delete("/:userId", async (req, res) => {
  try {
    const deletedUser = await User.remove({ _id: req.params.userId });
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// Update a user's bio
router.patch("/:userId", async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { _id: req.params.userId },
      { $set: { biography: req.body.biography } }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

export default router;
