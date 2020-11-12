import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "page-index",
    component: () =>
      import(/* webpackChunkName: "page-index" */ "../pages/index.vue"),
  },
  {
    path: "/signup",
    name: "page-signup",
    component: () =>
      import(/* webpackChunkName: "page-signup" */ "../pages/signup.vue"),
  },
  {
    path: "/album/:id",
    name: "page-album-detail",
    component: () =>
      import(
        /* webpackChunkName: "page-album-detail" */ "../pages/album-detail.vue"
      ),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/albums",
    name: "page-albums",
    component: () =>
      import(/* webpackChunkName: "page-albums" */ "../pages/albums.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
