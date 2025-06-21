const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const Player = require("../../api/models/Player");
const Game = require("../../api/models/Game");

const statsLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per minute
});

const authenticateCoach = require("../middleware/authenticateCoach");
const requireCoach = require("../middleware/requireCoach");

router.use(authenticateCoach);
router.use(requireCoach);

if (process.env.NODE_ENV === "production") {
  router.use(statsLimiter);
}

// GET /api/team-stats
router.get("/", async (req, res) => {
  try {
    const coachId = req.coachId;

    const totalPlayers = await Player.countDocuments({
      coachId: { $in: coachId },
    });
    const gamesPlayed = await Game.countDocuments({
      coachId: { $in: coachId },
    });
    const wins = await Game.countDocuments({
      coachId: { $in: coachId },
      result: "win",
    });
    const winRate =
      gamesPlayed > 0 ? ((wins / gamesPlayed) * 100).toFixed(1) + "%" : "0%";

    // Rating calculation: average of all player technical scores
    const players = await Player.find({ coachId: { $in: coachId } });
    let teamRating = 0;
    let playerCount = players.length;
    if (playerCount > 0) {
      let total = 0,
        count = 0;
      players.forEach((player) => {
        const tech = Object.values(player.technical || {});
        if (tech.length) {
          total += tech.reduce((a, b) => a + b, 0);
          count += tech.length;
        }
      });
      teamRating = count > 0 ? (total / count).toFixed(1) : 0;
    }

    res.json({
      totalPlayers,
      gamesPlayed,
      winRate,
      teamRating,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

const COACH_ID_NAME_MAP = {
  "665f1234567890abcdef2222": "coach2",
  "665f1234567890abcdef3333": "coach3",
  "665f1234567890abcdef1111": "coach1",
  "665f1234567890abcdef9999": "coachAdmin",
};

router.get("/players-by-coach", statsLimiter, async (req, res) => {
  try {
    const players = await Player.find({ coachId: { $in: req.coachId } });

    const grouped = {};
    players.forEach((player) => {
      const id = player.coachId.toString();
      if (!grouped[id]) grouped[id] = 0;
      grouped[id]++;
    });

    const total = players.length;

    res.json({
      grouped,
      total,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to group players" });
  }
});

module.exports = router;
