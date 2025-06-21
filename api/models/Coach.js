const mongoose = require("mongoose");

const coachSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String, // or use OAuth later
});

module.exports = mongoose.model("Coach", coachSchema);
