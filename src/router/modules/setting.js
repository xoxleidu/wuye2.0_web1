import main from "@/components/main/main";
export default {
  path: "/setting",
  name: "系统管理",
  component: main,
  meta: { name: "系统管理" },
  children: [
    {
      path: "/setting/user",
      name: "user",
      meta: { name: "用户管理" },
      component: () => import("@/views/setting/user/index.vue")
    },
    {
      path: "/setting/role",
      name: "role",
      meta: { name: "角色管理" },
      component: () => import("@/views/setting/role/index.vue")
    }
  ]
};
