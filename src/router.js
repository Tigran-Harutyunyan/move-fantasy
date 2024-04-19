import { createWebHistory, createRouter } from "vue-router";

import HomePage from "./pages/HomePage.vue";
import DetailsPage from "./pages/DetailsPage.vue";
import NotFoundPage from "./pages/404.vue";

const routes = [
  { path: "/", component: HomePage },
  { name: "movie", path: "/movie/:id", component: DetailsPage },
  { name: "tv", path: "/tv/:id", component: DetailsPage },
  {
    path: "/:notFound",
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    return {
      el: "body",
      behavior: "smooth",
    };
  },
});

export default router;
