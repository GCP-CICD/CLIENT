const employees = () => import("@/views/main/employees/employees/employees.vue");
export default {
  path: "/main/employees/employees",
  name: "employees",
  component: employees,
  children: [],
  meta: { title: "個人資訊" },
};
