# Team Tracker

Team Tracker is a full-stack web application designed to manage teams, players, and activities.  
It combines a modern frontend with a Node.js backend and MongoDB integration.

---

## Features

- Manage teams, players, and games
- Track recent activity and player history
- Backend API for CRUD operations
- Responsive frontend built with Vite
- Secure environment-based configuration
- Deployable on Vercel or container platforms

---

## Tech Stack

| Layer      | Technology                |
| ---------- | ------------------------- |
| Frontend   | Vite, JavaScript          |
| Backend    | Node.js, Express          |
| Database   | MongoDB                   |
| Deployment | Vercel, Docker (optional) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB instance (local or cloud)

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/CodyLiska/team-tracker.git
   cd team-tracker
   ```

2. Install dependencies for frontend and backend:

   ```bash
   npm install
   cd api && npm install
   ```

3. Configure environment variables:  
   Copy `.env.example` to `.env` (both at root and in `api/`) and fill in required values (database URI, API keys, etc).

4. Start the backend server:

   ```bash
   cd api
   npm run dev
   ```

5. Start the frontend:
   ```bash
   npm run dev
   ```

Visit [http://localhost:5173](http://localhost:5173) or whichever port Vite outputs.

---

## Development Guide

### API Overview

- `api/server.js` is the entry point for backend logic.
- Config files are in `api/config/` (DB connection, allowed emails).
- Data models (MongoDB/Mongoose) are in `api/models/`:
  - `Player.js`
  - `Game.js`
  - `ArchivedPlayer.js`
  - `RecentActivity.js`

### Common Tasks

- **Database migrations**: Add/update schemas in `/models` and restart server.
- **Environment configs**: Use `.env.local` for local dev, `.env.production` for deployment.
- **Vercel deployment**: Ensure `vercel.json` is present with routes configured.

### Troubleshooting

- If frontend cannot connect to backend, check CORS in `api/server.js`.
- Ensure MongoDB connection string is valid and matches environment config.

---

## Roadmap & TODO

- [ ] Add parent/guardian info to player model
- [ ] Improve activity/game integration with external sports apps
- [ ] Add summary pages for games and player stats
- [ ] Enhance color scheme and accessibility

### IMEDIATE TODO

- [ ] email based authentication for coaches dashboard
- [ ] email based authentication for parents dashboard

### PLAYER MODEL

- [ ] add robustness to the model
- [ ] parents name
- [ ] parents contact info (phone, email, etc)

### ACTIVITY TABLE

- [ ] possible have it update with data from sport easy app

### SUMMARY PAGES

- [ ] add a summary page to display all games played

### Down the road (NICE TO HAVE)

- [ ] implement a better color scheme - TEMPORARY FOR NOW
  - the overall layout
  - bar graph colors
- [ ] to delete a row from RecentActivity, you have to click into it to display a modal, then click the delete button.
- [ ] make the font in the Team Skills Overview chart look better.
- [ ] implement a dark mode

---

## Deployment

### Vercel

- Deploy frontend directly (Vite)
- Backend served via `api/` as serverless functions

### Docker (optional)

1. Build container:
   ```bash
   docker build -t team-tracker .
   ```
2. Run:
   ```bash
   docker run -p 3000:3000 team-tracker
   ```

---

## Acknowledgements

- [Vue.js](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Element Plus](https://element-plus.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
