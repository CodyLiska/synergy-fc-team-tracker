const mongoose = require("mongoose");

const recentActivitySchema = new mongoose.Schema({
  date: String, // mm/dd/yyyy
  player: String,
  activity: String,
  details: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("RecentActivity", recentActivitySchema);
