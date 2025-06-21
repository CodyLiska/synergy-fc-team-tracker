import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CoachDashboard from "../views/coach/CoachDashboard.vue";
// Commented out below after adding login functionality
// import AddGameOutcome from "../views/coach/AddGameOutcome.vue";
// import CreatePlayer from "../views/coach/CreatePlayer.vue";
// import AddActivity from "../views/coach/AddActivity.vue";
import Login from "@/views/Login.vue";
import { isAuthenticated } from "@/services/authService";

// Commented out below after adding login functionality
// const routes = [
//   { path: "/", name: "Home", component: HomeView },
//   {
//     path: "/coach",
//     name: "CoachDashboard",
//     component: CoachDashboard,
//     meta: { requiresAuth: true },
//   },
//   {
//     path: "/add-game-outcome",
//     name: "AddGameOutcome",
//     component: AddGameOutcome,
//     meta: { requiresAuth: true },
//   },
//   {
//     path: "/create-player",
//     name: "CreatePlayer",
//     component: CreatePlayer,
//     meta: { requiresAuth: true },
//   },
//   {
//     path: "/add-activity",
//     name: "AddActivity",
//     component: AddActivity,
//     meta: { requiresAuth: true },
//   },
// ];

const routes = [
  {
    path: "/",
    redirect: () => (isAuthenticated() ? "/coach" : "/login"),
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/coach",
    component: CoachDashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next("/login");
  } else {
    next();
  }
});

export default router;
