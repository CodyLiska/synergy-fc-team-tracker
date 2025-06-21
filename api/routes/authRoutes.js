const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Coach = require("../models/Coach");
const allowedEmails = require("../config/allowedEmails");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "refresh_secret";

// Utility: Generate both tokens
function generateTokens(coach) {
  const payload = { id: coach._id, role: coach.role };

  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });

  return { accessToken, refreshToken };
}

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let coach = await Coach.findOne({ email });

    // First-time login (register from allowed list)
    if (!coach) {
      const allowed = allowedEmails[email];
      if (!allowed) {
        return res.status(403).json({ error: "Email not authorized" });
      }

      const hash = await bcrypt.hash(password, 12);
      coach = await Coach.create({
        email,
        name: email.split("@")[0],
        passwordHash: hash,
        role: allowed.role,
      });
    }

    // Validate password
    const valid = await bcrypt.compare(password, coach.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(coach);

    // Set refresh token in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({
      accessToken,
      coachId: coach._id,
      name: coach.name,
      role: coach.role,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/refresh-token", async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(401).json({ error: "Refresh token missing" });
    }

    const payload = jwt.verify(token, REFRESH_SECRET);
    const coach = await Coach.findById(payload.id);
    if (!coach) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
      { id: coach._id, role: coach.role },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("Refresh error:", err);
    return res.status(403).json({ error: "Invalid or expired refresh token" });
  }
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.sendStatus(204);
});

module.exports = router;
