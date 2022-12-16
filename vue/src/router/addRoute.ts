import _cache from "@/lib/_cache";
import router, { userMenuToRoutes } from "@/router";
import store from "@/store";

import { getRoute } from "@/api/instance1";

export const addRoute = async (role_id: number) => {
  let res;
  if (_cache.getItem("routes", "session")) {
    //要刪
    res = _cache.getItem("routes", "session");
  } else {
    //取得路由
    res = (await getRoute(role_id)).data;
    _cache.setItem("routes", res, "session");
  }

  const routes = await userMenuToRoutes(res);

  routes.forEach((v: any) => router.addRoute("main", v));
  // //格式化路由
  // const routes: Array<RouteRecordRaw> = [];
  // res.map((pv: any) => {
  //   return pv.children.map((v: any) => {
  //     routes.push({
  //       name: v.name,
  //       path: v.path,
  //       component: () => import(`@/views/main${v.component}`), //webpackChunkName????
  //       meta: { title: v.title },
  //     });
  //   });
  // });

  // //註冊路由
  // await routes.forEach((v: any) => router.addRoute("main", v));

  router.addRoute({
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("@/views/404/index.vue"),
  });
  res.unshift({ title: "dashboard", path: "/dashboard", icon: "Menu", name: "dashboard", parentId: 0 }), store.commit("login/USER_MENU", res);
};
