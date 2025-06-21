const mongoose = require("mongoose");

const coachSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: { type: String, required: true, trim: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["headCoach", "coachATeam", "coachBTeam", "admin"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coach", coachSchema);
