require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const connectDB = require("./config/db");
const helmet = require("helmet");
const playerRoutes = require("./routes/playerRoutes");
const gameRoutes = require("./routes/gameRoutes");
const statsRoutes = require("./routes/teamStatsRoutes");
const recentActivityRoutes = require("./routes/recentActivityRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// CORS middleware
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Rate limiting middleware
app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 60, // Limit each IP to 60 requests per minute
  })
);

app.use(express.json());

// ** If needed **
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       styleSrc: ["'self'", 'https:'], // safer — allow external styles only
//       scriptSrc: ["'self'"],
//       imgSrc: ["'self'", 'data:'],
//     },
//   })
// );

// Use defaults — no inline styles allowed
app.use(helmet());

// Routes
app.use("/api/players", playerRoutes);
app.use("/api/recent-activity", recentActivityRoutes);
app.use("/api/team-stats", statsRoutes);
app.use("/api/games", gameRoutes);

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
