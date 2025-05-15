require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const playerRoutes = require('./routes/playerRoutes');
const gameRoutes = require('./routes/gameRoutes');
const statsRoutes = require('./routes/teamStatsRoutes');
const recentActivityRoutes = require('./routes/recentActivityRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend port
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/players', playerRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/recent-activity', recentActivityRoutes);
app.use('/api/team-stats', statsRoutes);
app.use('/api/games', gameRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});