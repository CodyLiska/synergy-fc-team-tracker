const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  psychological: {
    type: Map,
    of: Number,
    default: {
      SELF_CONFIDENCE: 0,
      COMPETITIVENESS: 0,
      CONCENTRATION: 0,
      SELF_CONTROL: 0,
      DETERMINATION: 0,
      ENJOYMENT: 0,
    },
  },
  physical: {
    type: Map,
    of: Number,
    default: {
      AGILITY: 0,
      BALANCE: 0,
      COORDINATION: 0,
      STAMINA: 0,
      STRENGTH: 0,
      SPEED: 0,
      ACCELERATION: 0,
      REACTION: 0,
    },
  },
  socialEmotional: {
    type: Map,
    of: Number,
    default: {
      LISTENING: 0,
      COOPERATION: 0,
      COMMUNICATION: 0,
      SHARING: 0,
      PROBLEM_SOLVING: 0,
      DECISION_MAKING: 0,
      EMPATHY: 0,
      PATIENCE: 0,
      RESPECT_DISCIPLINE: 0,
    },
  },
  technical: {
    type: Map,
    of: Number,
    default: {
      DRIBBLING: 0,
      SHOOTING: 0,
      RUNNING_WITH_BALL: 0,
      TURNING_WITH_BALL: 0,
      RECEIVING_THE_BALL: 0,
      PASSING: 0,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Player", playerSchema);
