const TEAM_MAP = require("../config/teamMap");

function requireCoach(req, res, next) {
  const coachId = req.header("X-Coach-ID");
  const allowedIds = TEAM_MAP[coachId];

  if (!Array.isArray(allowedIds) || allowedIds.length === 0) {
    return res.status(403).json({ error: "No accessible coach IDs" });
  }

  if (!allowedIds) {
    return res.status(403).json({ error: "Unauthorized coach" });
  }

  req.coachIds = allowedIds[0];
  next();
}

module.exports = requireCoach;
