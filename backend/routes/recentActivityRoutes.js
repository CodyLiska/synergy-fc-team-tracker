const express = require("express");
const router = express.Router();
const RecentActivity = require("../models/RecentActivity");

// GET /api/recent-activity
router.get("/", async (req, res) => {
  try {
    const activities = await RecentActivity.find()
      .sort({ createdAt: -1 })
      .limit(10);
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/recent-activity
router.post("/", async (req, res) => {
  try {
    const { date, player, activity, details } = req.body;
    const newActivity = new RecentActivity({ date, player, activity, details });
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await RecentActivity.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
