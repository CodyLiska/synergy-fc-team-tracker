# Team Tracker Vue

A modern, full-stack team management and player tracking application built with **Vue 3**, **Vite**, and a **Node.js/MongoDB** backend. Designed for coaches and team managers to easily track player stats, game outcomes, activities, and more in a clean, user-friendly interface.

---

## Features

- **Coach Dashboard**
  - View team stats (total players, games played, win rate, team rating)
  - Visualize team skill averages in a bar chart
  - See recent activities and game outcomes in a unified activity feed
  - Add, edit, and delete players with full skill hierarchy
  - Add and manage game outcomes
  - Quick access to add new activities or players

- **Player Management**
  - Create, update, and archive players
  - Track detailed skill hierarchies (psychological, physical, social/emotional, technical)
  - View player details in a modal with full stats

- **Game & Activity Tracking**
  - Log game outcomes with opponent, score, and result
  - Track recent activities and game results in a sortable table
  - Delete activities or games directly from the dashboard

- **Modern UI**
  - Clean, responsive design with a pleasant, accessible color palette
  - Built with Vue 3 `<script setup>` SFCs and Element Plus UI library

---

## Tech Stack

- **Frontend:** Vue 3, Vite, Element Plus, Axios
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Other:** ESLint, Prettier, modern CSS

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/team-tracker-vue.git
   cd team-tracker-vue
   ```

2. **Install frontend dependencies:**
   ```bash
   cd team-tracker-vue
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd end
   npm install
   ```

4. **Configure environment variables:**
   - Copy `.env.example` to `.env` in the backend folder and set your MongoDB URI and any other secrets.

5. **Start the backend server:**
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:5000`.

6. **Start the frontend dev server:**
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`.

---

## Project Structure

```
team-tracker-vue/
├── src/                  # Vue frontend source code
│   ├── components/
│   ├── views/
│   ├── services/
│   └── style.css
├── end/                  # Node.js backend source code
│   ├── models/
│   ├── routes/
│   └── server.js
├── package.json
└── README.md
```

---

## Roadmap & TODO

- [ ] Add parent/guardian info to player model
- [ ] Improve activity/game integration with external sports apps
- [ ] Add summary pages for games and player stats
- [ ] Enhance color scheme and accessibility
- [ ] Modal-based row deletion for recent activity

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## License

This project is licensed under the Apache-2.0 license.

---

## Acknowledgements

- [Vue.js](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Element Plus](https://element-plus.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)