const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/Task");
const User = require("../models/user");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();
router.use(protect);

// CREATE TASK
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title)
      return res.status(400).json({ message: "Title is required" });

    const task = await Task.create({
      title,
      description,
      userId: req.user._id,
    });

    res.status(201).json(task);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// GET ALL TASKS
router.get("/", async (req, res) => {
  try {
    const filter = req.user.role === "admin" ? {} : { userId: req.user._id };

    const tasks = await Task.find(filter)
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// GET SINGLE TASK
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const task = await Task.findById(req.params.id).populate("userId", "name email");

    if (!task)
      return res.status(404).json({ message: "Task not found" });

    const isOwner = task.userId._id.toString() === req.user._id.toString();

    if (!isOwner && req.user.role !== "admin")
      return res.status(403).json({ message: "Access denied" });

    res.json(task);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE TASK
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const task = await Task.findById(req.params.id);
    if (!task)
      return res.status(404).json({ message: "Task not found" });

    const isOwner = task.userId.toString() === req.user._id.toString();

    if (!isOwner && req.user.role !== "admin")
      return res.status(403).json({ message: "Access denied" });

    const { title, description } = req.body;

    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );

    res.json(updated);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE TASK
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const task = await Task.findById(req.params.id);
    if (!task)
      return res.status(404).json({ message: "Task not found" });

    const isOwner = task.userId.toString() === req.user._id.toString();

    if (!isOwner && req.user.role !== "admin")
      return res.status(403).json({ message: "Access denied" });

    await task.deleteOne();

    res.json({ message: "Task deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// ADMIN ROUTE
router.get("/admin/users", adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;