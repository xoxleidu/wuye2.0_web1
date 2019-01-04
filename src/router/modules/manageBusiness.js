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
          meta: { name: "物产信息" },
          component: () => import("@/views/manageBusiness/estate/index.vue")
        }
      ]
    },
    {
      path: "/manageBusiness/ammeter",
      name: "ammeter",
      meta: { name: "电表管理", single: true },
      component: () => import("@/views/manageBusiness/ammeter/index.vue"),
      children: [
        {
          path: "/manageBusiness/ammeterinfo",
          name: "ammeterinfo",
          meta: { name: "电表详情" },
          component: () => import("@/views/manageBusiness/ammeter/readrecord.vue")
        }
      ]
    },
    {
      path: "/manageBusiness/paytype",
      name: "paytype",
      meta: { name: "支出类型" },
      component: () => import("@/views/manageBusiness/paytype/index.vue")
    }
  ]
};
