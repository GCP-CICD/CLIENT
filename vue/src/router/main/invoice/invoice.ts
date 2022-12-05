const invoice = () => import("@/views/main/order/invoice/invoice.vue");
export default {
  path: "/main/order/invoice",
  name: "invoice",
  component: invoice,
  children: [],
  meta: { title: "對帳單" },
};
