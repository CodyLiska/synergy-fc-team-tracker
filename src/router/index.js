import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/coach",
    name: "CoachDashboard",
    component: () => import("@/views/coach/CoachDashboard.vue"),
  },
  {
    path: "/coach/add-game-outcome",
    name: "AddGameOutcome",
    component: () => import("@/views/coach/AddGameOutcome.vue"),
  },
  {
    path: "/coach/add-activity",
    name: "AddActivity",
    component: () => import("@/views/coach/AddActivity.vue"),
  },
  {
    path: "/coach/add-player",
    name: "AddPlayer",
    component: () => import("@/views/coach/CreatePlayer.vue"), // NOT CreatePlayer.vue
  },
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
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
