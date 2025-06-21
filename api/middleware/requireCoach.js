const TEAM_MAP = require("../config/teamMap");

function requireCoach(req, res, next) {
  const coachId = req.header("X-Coach-ID");

  if (!coachId) {
    return res.status(401).json({ error: "Missing coach ID" });
  }

  const allowedIds = TEAM_MAP[coachId];
  if (!allowedIds) {
    return res.status(403).json({ error: "Unauthorized coach" });
  }

  req.coachId = coachId;
  req.coachIds = allowedIds;
  next();
}

module.exports = requireCoach;
