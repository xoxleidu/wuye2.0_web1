import main from "@/components/main/main";
export default {
  path: "/queryinfo",
  name: "信息查询",
  component: main,
  meta: { name: "信息查询" },
  children: [
    {
      path: "/queryinfo/estate",
      name: "estate",
      meta: { name: "物产查询" },
      component: () => import("@/views/manageBusiness/estate/index.vue")
    },
    {
      path: "/queryinfo/feiyong",
      name: "feiyong",
      meta: { name: "费用查询" },
      component: () => import("@/components/404.vue")
    }
  ]
};
