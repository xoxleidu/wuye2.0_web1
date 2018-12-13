import Vue from "vue";
import Router from "vue-router";
import home from "./views/home";
import main from "@/components/main/main";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "main",
      component: main,
      meta: { name: "常用" },
      redirect: "/home",
      children: [
        {
          path: "/home",
          name: "home",
          component: home,
          meta: { name: "常用", hidden: true }
        },
        {
          path: "/table",
          name: "table",
          meta: { name: "表格" },
          component: () =>
            import(/* webpackChunkName: "table" */ "./views/table.vue")
        },
        {
          path: "/form",
          name: "form",
          meta: { name: "表单" },
          component: () =>
            import(/* webpackChunkName: "table" */ "./views/form.vue")
        }
      ]
    },
    {
      path: "/level",
      name: "level",
      component: main,
      meta: { name: "level1" },
      children: [
        {
          path: "/level1-1",
          name: "level1-1",
          meta: { name: "层级1-1" },
          component: () =>
            import(/* webpackChunkName: "about" */ "@/components/level.vue")
        },
        {
          path: "/level1-2",
          name: "level1-2",
          meta: { name: "层级1-2" },
          component: () =>
            import(/* webpackChunkName: "about" */ "@/components/level.vue")
        }
      ]
    }
  ]
});
