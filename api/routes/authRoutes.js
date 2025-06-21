const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Coach = require("../models/Coach");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const coach = await Coach.findOne({ email });

  if (!coach) return res.status(401).json({ error: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, coach.passwordHash);
  if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: coach._id }, JWT_SECRET, { expiresIn: "1d" });
  res.json({ token, coachId: coach._id });
});

module.exports = router;
