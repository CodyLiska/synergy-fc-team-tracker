const express = require("express");
const router = express.Router();
const { body, query, param, validationResult } = require("express-validator");
const Game = require("../../api/models/Game");
const Player = require("../../api/models/Player");

router.post(
  "/",
  [
    // ** TODO: THIS CAUSES A BAD REQUEST ERROR **
    // body("opponent").isString().trim().notEmpty(),
    // body("date").isISO8601(),
    // body("score").isString().notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const game = new Game(req.body);
      await game.save();
      res.status(201).json(game);
    } catch (err) {
      res.status(400).json({ error: "Failed to save game" });
    }
  }
);

// GET /api/games?limit=5&sort=-date
router.get(
  "/",
  [query("limit").isInt({ min: 1, max: 100 })],
  [query("sort").isIn(["date", "-date"])],
  async (req, res) => {
    try {
      // const limit = parseInt(req.query.limit) || 5;
      const limit = Math.min(parseInt(req.query.limit) || 5, 100); // cap at 100
      const sort = req.query.sort === "-date" ? { date: -1 } : { date: 1 };
      const games = await Game.find().sort(sort).limit(limit);
      res.json(games);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch games" });
    }
  }
);

router.delete("/:id", [param("id").isMongoId()], async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete game" });
  }
});

module.exports = router;
