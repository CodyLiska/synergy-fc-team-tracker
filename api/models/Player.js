const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  number: {
    type: Number,
    required: true,
  },
  position: {
    type: String,
    required: true,
    trim: true,
  },
  psychological: {
    type: Map,
    of: Number,
    default: {
      selfConfidence: 0,
      competitiveness: 0,
      concentration: 0,
      selfControl: 0,
      determination: 0,
      enjoyment: 0,
    },
  },
  physical: {
    type: Map,
    of: Number,
    default: {
      agility: 0,
      balance: 0,
      coordination: 0,
      stamina: 0,
      strength: 0,
      speed: 0,
      acceleration: 0,
      reaction: 0,
    },
  },
  socialEmotional: {
    type: Map,
    of: Number,
    default: {
      listening: 0,
      cooperation: 0,
      communication: 0,
      sharing: 0,
      problemSolving: 0,
      decisionMaking: 0,
      empathy: 0,
      patience: 0,
      respectDiscipline: 0,
    },
  },
  technical: {
    type: Map,
    of: Number,
    default: {
      dribbling: 0,
      shooting: 0,
      runningWithBall: 0,
      turningWithBall: 0,
      receivingTheBall: 0,
      passing: 0,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Player", playerSchema);
