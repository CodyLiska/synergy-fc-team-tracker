// const TEAM_MAP = require("../config/teamMap");

// function requireCoach(req, res, next) {
//   const coachId = req.header("X-Coach-ID");

//   if (!coachId) {
//     return res.status(401).json({ error: "Missing coach ID" });
//   }

//   const allowedIds = TEAM_MAP[coachId];
//   if (!allowedIds) {
//     return res.status(403).json({ error: "Unauthorized coach" });
//   }

//   req.coachId = coachId;
//   req.coachIds = allowedIds;
//   next();
// }

// module.exports = requireCoach;

const jwt = require("jsonwebtoken");
const Coach = require("../models/Coach");
const TEAM_MAP = require("../config/teamMap");
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

const requireCoach = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const coach = await Coach.findById(decoded.id);
    if (!coach) return res.status(401).json({ message: "Coach not found" });

    req.coach = coach;
    req.coachId = coach._id.toString();

    // Role-based logic: admin and coach1 can access everyone
    if (coach.role === "admin") {
      req.coachIds = TEAM_MAP["665f1234567890abcdef9999"];
    } else if (coach._id.toString() === "665f1234567890abcdef1111") {
      req.coachIds = TEAM_MAP["665f1234567890abcdef1111"];
    } else {
      req.coachIds = [req.coachId];
    }

    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = requireCoach;
