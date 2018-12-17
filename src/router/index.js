import Vue from "vue";
import Router from "vue-router";
import main from "@/components/main/main";
import NProgress from "nprogress"; // progress bar
import { Message } from "element-ui";
import store from "@/store";
Vue.use(Router);
import "nprogress/nprogress.css";
NProgress.configure({
  showSpinner: false
}); // 隐藏右上loading图标

/*
  1、定义路由配置 routes=[];
    其中，meta可扩展各信息，例如路由状态或者路由类型，约定以下几种
      (1) : single 独立路由，该路由只有一个默认子路由(默认不配置)
      (2) ：hidden 隐藏路由，该路由在界面中隐藏（默认不配置）
      (3) ：icon 路由对应图标的class 或其他实现方式的图标（默认不配置）
      (4) ：name 路由对应的名称，用做呈现
      (5) : p 路由所需要的权限
      

*/
var routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login.vue")
  },
  {
    path: "/signle",
    component: main,
    meta: { name: "独立路由", single: true, icon: "el-icon-menu" },
    children: [
      {
        path: "",
        name: "signle",
        component: () => import("@/views/home.vue")
        // meta: {p:"111"}, //独立路由权限需要加到子路由中
      }
    ]
  },
  {
    path: "/",
    name: "main",
    component: main,
    meta: { name: "常用", icon: "el-icon-star-on" },
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home.vue"),
        meta: { name: "常用" }
      },
      {
        path: "/table",
        name: "table",
        meta: { name: "表格" },
        component: () => import("@/views/table.vue")
      },
      {
        path: "/form",
        name: "form",
        meta: { name: "表单" },
        component: () => import("@/views/form.vue")
      }
    ]
  },
  {
    path: "/rights",
    name: "rights",
    component: main,
    meta: { name: "权限控制", icon: "el-icon-setting" },
    children: [
      {
        path: "/hasRight",
        name: "hasRight",
        component: () => import("@/views/home.vue"),
        meta: { name: "有权限" }
      },
      {
        path: "/noRight",
        name: "noRight",
        component: () => import("@/views/home.vue"),
        meta: { name: "无权限", p: "123asdad" }
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
        component: () => import("@/components/level.vue")
      },
      {
        path: "/level1-2",
        name: "level1-2",
        meta: { name: "层级1-2" },
        component: () => import("@/components/level.vue")
      }
    ]
  }
];

/*
 * 验证权限
 * 传入路由，递归判断meta中的p  如果存在于store（vuex）中存储的用户权限，
 * 动态设置 meta的 hasRights为true，否则为false
 */
(function() {
  var userRights = store.state.user.rights;
  var isAdmin = store.state.user.user_id == 1;
  permissions(routes);
  function permissions(routers) {
    routers.map(router => {
      router.meta = router.meta || {};
      if (router.children) {
        permissions(router.children);
      }
      if (isAdmin && router.meta) {
        //管理员都为true
        router.meta.hasRights = true;
        return false;
      }
      var routerRights = router.meta.p;
      if (routerRights) {
        routerRights = routerRights.split(",");
      } else {
        router.meta.hasRights = true;
        return false;
      }
      router.meta.hasRights = false;

      routerRights.map(rights => {
        if (userRights.indexOf(rights) != -1) {
          router.meta.hasRights = true;
        }
      });
    });
  }
})();

/**
 * 创建路由实例
 */
var router = new Router({
  // mode: "history",
  routes: routes
});

/**
 * 路由守卫
 * 1、判断to是否有权限，如果没有 回到from
 * 2、判断是否登录，如果没有登录 回到login
 * 3、如果已经登录，并且路由为login，跳转到首页
 */
router.beforeEach((to, from, next) => {
  NProgress.inc();
  if (to.meta.hasRights === false) {
    Message({
      showClose: true,
      message: "没有权限！",
      type: "warning"
    });
    next(from.path);
    NProgress.done();
    return false;
  }
  if (store.getters.isLogin && localStorage.CCCTSUSER) {
    if (to.name == "login") {
      next({
        path: "/"
      });
    }
    next();
  } else {
    if (to.name != "login") {
      Message({
        showClose: true,
        message: "请重新登录！"
      });
      next({
        path: "/login"
      });
      return false;
    }
    next();
  }
  NProgress.done();
});
router.afterEach(() => {
  NProgress.done(); // finish progress bar
});

export default router;
