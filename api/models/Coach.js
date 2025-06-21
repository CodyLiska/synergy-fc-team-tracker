const mongoose = require("mongoose");

const coachSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, select: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coach", coachSchema);
