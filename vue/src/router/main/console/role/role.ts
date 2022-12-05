const role = () => import("@/views/main/console/role/role.vue");
export default {
  path: "/main/console/role",
  name: "role",
  component: role,
  children: [],
  meta: { title: "角色管理" },
};
