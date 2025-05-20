const mongoose = require("mongoose");

const recentActivitySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  player: { type: String, required: true, trim: true },
  activity: { type: String, required: true, trim: true },
  details: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("RecentActivity", recentActivitySchema);
