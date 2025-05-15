const express = require("express");
const router = express.Router();
const Player = require("../models/Player");
const ArchivedPlayer = require("../models/ArchivedPlayer");
const Game = require("../models/Game");

// Get all players
router.get("/", async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single player
router.get("/:id", getPlayer, (req, res) => {
  res.json(res.player);
});

// Create a player
router.post("/", async (req, res) => {
  const player = new Player({
    name: req.body.name,
    number: req.body.number,
    position: req.body.position,
    psychological: req.body.psychological,
    physical: req.body.physical,
    socialEmotional: req.body.socialEmotional,
    technical: req.body.technical,
  });

  try {
    const newPlayer = await player.save();
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a player
router.patch("/:id", getPlayer, async (req, res) => {
  if (req.body.name != null) {
    res.player.name = req.body.name;
  }
  if (req.body.number != null) {
    res.player.number = req.body.number;
  }
  if (req.body.position != null) {
    res.player.position = req.body.position;
  }
  if (req.body.psychological != null) {
    res.player.psychological = req.body.psychological;
  }
  if (req.body.physical != null) {
    res.player.physical = req.body.physical;
  }
  if (req.body.socialEmotional != null) {
    res.player.socialEmotional = req.body.socialEmotional;
  }
  if (req.body.technical != null) {
    res.player.technical = req.body.technical;
  }

  try {
    const updatedPlayer = await res.player.save();
    res.json(updatedPlayer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Archive a player (move to archive collection)
router.post("/:id/archive", async (req, res) => {
  const player = await Player.findById(req.params.id);
  if (!player) return res.status(404).send("Player not found");
  await ArchivedPlayer.create(player.toObject());
  await player.deleteOne();
  res.sendStatus(204);
});

// Middleware to get player by ID
async function getPlayer(req, res, next) {
  let player;
  try {
    player = await Player.findById(req.params.id);
    if (player == null) {
      return res.status(404).json({ message: "Cannot find player" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.player = player;
  next();
}

module.exports = router;
