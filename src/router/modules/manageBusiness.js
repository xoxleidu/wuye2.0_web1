import main from "@/components/main/main";

export default {
  path: "/manageBusiness",
  name: "业务管理",
  component: main,
  meta: { name: "业务管理", hideInBread: true },
  children: [
    {
      path: "/manageBusiness/community",
      name: "community",
      meta: { name: "物产管理", single: true },
      component: () => import("@/views/manageBusiness/community/index.vue"),
      children: [
        {
          path: "/manageBusiness/estate",
          name: "estate",
          meta: { name: "物产详情" },
          component: () => import("@/views/manageBusiness/building/index.vue")
        }
      ]
    },
    {
      path: "/manageBusiness/chargingitems",
      name: "chargingitems",
      meta: { name: "电表管理" },
      component: () => import("@/views/manageBusiness/ammeter/index.vue")
    }
  ]
};
