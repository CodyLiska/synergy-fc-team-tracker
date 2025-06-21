function requireCoach(req, res, next) {
  const coachId = req.header("X-Coach-ID");

  if (!coachId) {
    return res.status(401).json({ error: "Missing X-Coach-ID header" });
  }

  // Optional: Validate format if needed (e.g., UUID or Mongo ObjectId)
  req.coachId = coachId;
  next();
}

module.exports = requireCoach;
