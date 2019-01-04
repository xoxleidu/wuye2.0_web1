import Vue from "vue";
import Router from "vue-router";
import main from "@/components/main/main";
import NProgress from "nprogress"; // progress bar
import { Message } from "element-ui";
import store from "@/store";
//引入路由
import setting from "./modules/setting";
import manageBusiness from "./modules/manageBusiness";
import queryInfo from "./modules/queryInfo";
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
      (6) : hideInBread 在面包屑中是否可点击 默认为true
*/
var routes = [
  {
    path: "/",
    component: main,
    meta: { hidden: true, name: "首页", icon: "el-icon-star-on" },
    children: [
      {
        path: "",
        component: () => import("@/views/home.vue")
      }
    ]
  },
  {
    path: "/login",
    meta: { hidden: true },
    component: () => import("@/views/login.vue")
  },
  queryInfo,
  setting,
  manageBusiness,
  {
    path: "/test",
    component: main,
    meta: {
      name: "测试",
      single: true,
      icon: "el-icon-menu"
    },
    children: [
      {
        path: "",
        component: () => import("@/views/test/test.vue")
      }
    ]
  },
  {
    path: "/zujian",
    component: main,
    meta: {
      name: "组件",
      single: true,
      icon: "el-icon-menu"
    },
    children: [
      {
        path: "",
        component: () => import("@/views/test/zujian.vue")
      }
    ]
  },
  {
    path: "*",
    component: main,
    meta: { hidden: true },
    children: [
      {
        path: "",
        component: () => import("@/components/404.vue")
      }
    ]
  }
];

/*
 * 验证权限
 * 传入路由，递归判断meta中的p  是否存在于store（vuex）中存储的用户权限，
 * 如果不存在，删除路由
 */
(function() {
  var userRights = store.state.user.rights;
  var isAdmin = store.state.user.user_id == 1;
  permissions(routes);
  function permissions(routers) {
    routers.map((router, index) => {
      router.meta = router.meta || {};
      if (router.children) {
        permissions(router.children);
      }
      if (isAdmin && router.meta) {
        //管理员都为true
        // router.meta.hasRights = true;
        return false;
      }
      var routerRights = router.meta.p;
      if (routerRights) {
        routerRights = routerRights.split(",");
      } else {
        // router.meta.hasRights = true;
        return false;
      }
      var hasRight = false;

      routerRights.map(rights => {
        if (userRights.indexOf(rights) != -1) {
          hasRight = true;
        }
      });
      if (!hasRight) {
        routers.splice(index, 1);
      }
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
    if (to.path == "/login") {
      next({
        path: "/"
      });
    }
    next();
  } else {
    if (to.path != "/login") {
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
