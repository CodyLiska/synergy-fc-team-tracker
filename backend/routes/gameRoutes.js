const express = require("express");
const router = express.Router();
const Game = require("../models/Game");
const Player = require("../models/Player");

router.post("/", async (req, res) => {
  try {
    const game = new Game(req.body);
    await game.save();
    res.status(201).json(game);
  } catch (err) {
    res.status(400).json({ error: "Failed to add game" });
  }
});

// GET /api/games?limit=5&sort=-date
router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const sort = req.query.sort === "-date" ? { date: -1 } : { date: 1 };
    const games = await Game.find().sort(sort).limit(limit);
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch games" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete game" });
  }
});

module.exports = router;
