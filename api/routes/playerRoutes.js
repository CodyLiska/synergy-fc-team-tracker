const express = require("express");
const router = express.Router();
const { body, param, validationResult } = require("express-validator");
const Player = require("../../api/models/Player");
const ArchivedPlayer = require("../../api/models/ArchivedPlayer");
const requireCoach = require("../middleware/requireCoach");

router.use(requireCoach); // Apply coach middleware

// GET /api/players
router.get("/", async (req, res) => {
  try {
    const players = await Player.find({ coachId: { $in: req.coachId } });
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/players/:id
router.get("/:id", [param("id").isMongoId()], getPlayer, (req, res) => {
  res.json(res.player);
});

// POST /api/players
router.post(
  "/",
  [
    body("name").isString().trim().notEmpty(),
    body("number").isInt({ min: 0 }),
    body("position").isString().trim().notEmpty(),
  ],
  async (req, res) => {
    console.log("Received payload:", req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const player = new Player({
      name: req.body.name,
      number: req.body.number,
      position: req.body.position,
      coachId: req.coachId,
    });
    console.log("Player object created:", player);
    try {
      const newPlayer = await player.save();
      res.status(201).json(newPlayer);
    } catch (error) {
      console.error("Error saving player:", error);
      res.status(400).json({ message: error.message });
    }
  }
);

// PATCH /api/players/:id
router.patch(
  "/:id",
  [
    param("id").isMongoId(),
    body("name").optional().isString().trim().notEmpty(),
    body("number").optional().isInt({ min: 0 }),
    body("position").optional().isString().trim().notEmpty(),
    body("psychological").optional().isObject(),
    body("physical").optional().isObject(),
    body("socialEmotional").optional().isObject(),
    body("technical").optional().isObject(),
  ],
  getPlayer,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updateFields = [
      "name",
      "number",
      "position",
      "psychological",
      "physical",
      "socialEmotional",
      "technical",
    ];

    updateFields.forEach((field) => {
      if (req.body[field] != null) {
        res.player[field] = req.body[field];
      }
    });

    try {
      const updatedPlayer = await res.player.save();
      res.json(updatedPlayer);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// POST /api/players/:id/archive
// This endpoint archives a player by moving them to the ArchivedPlayer collection
// and deleting them from the Player collection.
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
