const express = require("express");
const router = express.Router();
const Player = require("../models/Player");
const Game = require("../models/Game");

router.get("/", async (req, res) => {
  try {
    const totalPlayers = await Player.countDocuments();
    const gamesPlayed = await Game.countDocuments();
    const wins = await Game.countDocuments({ result: "win" });
    const winRate =
      gamesPlayed > 0 ? ((wins / gamesPlayed) * 100).toFixed(1) + "%" : "0%";

    // Rating calculation: average of all player technical scores
    const players = await Player.find();
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

module.exports = router;
