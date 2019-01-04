import main from "@/components/main/main";

export default {
  path: "/financialBusiness",
  name: "财务管理",
  component: main,
  meta: { name: "财务管理", hideInBread: true },
  children: [
    {
      path: "/financialBusiness/pay",
      name: "pay",
      meta: { name: "支出" },
      component: () => import("@/views/financialBusiness/pay/index.vue"),
    }
  ]
};
