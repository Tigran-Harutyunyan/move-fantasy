import { createWebHistory, createRouter } from "vue-router";

import HomePage from "./pages/HomePage.vue";
import DetailsPage from "./pages/DetailsPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/movie/:id", component: DetailsPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
