const route = () => import("@/views/main/console/route/route.vue");
export default {
  path: "/main/console/route",
  name: "route",
  component: route,
  children: [],
  meta: { title: "功能管理" },
};
