import { createRouter, createWebHistory } from "vue-router";
import CoachDashboard from "../views/coach/CoachDashboard.vue";
import AddGameOutcome from "../views/coach/AddGameOutcome.vue";
import CreatePlayer from "../views/coach/CreatePlayer.vue";
import AddActivity from "../views/coach/AddActivity.vue";
import HomeView from "../views/HomeView.vue";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/coach", name: "CoachDashboard", component: CoachDashboard },
  { path: "/add-game-outcome", name: "AddGameOutcome", component: AddGameOutcome },
  { path: "/create-player", name: "CreatePlayer", component: CreatePlayer },
  { path: "/add-activity", name: "AddActivity", component: AddActivity },
];

// If implement login later, protect routes:
// router.beforeEach((to, from, next) => {
//   const isAuthenticated = localStorage.getItem("token"); // or Vuex/state
//   const protectedRoutes = ["/coach", "/create-player", "/add-activity"];

//   if (protectedRoutes.includes(to.path) && !isAuthenticated) {
//     return next("/");
//   }

//   next();
// });

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
