import _cache from "@/lib/_cache";
import store from "@/store";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "main",
    component: () => import(/* webpackChunkName: "main" */ "@/views/main/index.vue"),
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import(/* webpackChunkName: "dashboard" */ "@/views/main/dashboard/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "@/views/login/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  if (to.path !== "/login") {
    if (!_cache.getItem("token", "session")) {
      return "/login";
    }
  }
  if (to.path === "/login") {
    if (_cache.getItem("token", "session")) {
      store.dispatch("setMessage", { message: "請勿重複登入" });
      return "/";
    }
  }
});
export { addRoute } from "./addRoute";
export { pathToBreadcrumb } from "./pathToBreadcrumb";
export { userMenuToRoutes } from "./userMenuToRoutes";

export default router;
