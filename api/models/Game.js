const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  opponent: { type: String, required: true },
  result: { type: String, enum: ['win', 'loss', 'draw'], required: true },
  score: {
    us: { type: Number, required: true },
    them: { type: Number, required: true }
  }
});

module.exports = mongoose.model('Game', gameSchema);