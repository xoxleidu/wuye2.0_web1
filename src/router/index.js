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
        component: () => import("@/views/test.vue")
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
        component: () => import("@/views/zujian.vue")
      }
    ]
  },
  {
    path: "/manageBusiness",
    name: "业务管理",
    component: main,
    meta: { name: "业务管理" },
    children: [
      {
        path: "/manageBusiness/community",
        name: "community",
        meta: { name: "物产管理",single:true },
        component: () => import("@/views/manageBusiness/community.vue"),
        children: [
          {
            path: "/manageBusiness/estate",
            name: "estate",
            meta: { name: "物产详情"},
            component: () => import("@/views/manageBusiness/estate.vue")
          }
        ]
      },
      {
        path: "/manageBusiness/chargingitems",
        name: "chargingitems",
        meta: { name: "收费项管理"},
        component: () => import("@/views/manageBusiness/chargingitems.vue")
      }
    ]
  },
  {
    path: "/manageSys",
    name: "系统管理",
    component: main,
    meta: { name: "系统管理" },
    children: [
      {
        path: "/manageSys/user",
        name: "user",
        meta: { name: "用户管理" },
        component: () => import("@/views/manageSys/user/user.vue")
      },
      {
        path: "/manageSys/group",
        name: "group",
        meta: { name: "权限管理" },
        component: () => import("@/views/manageSys/group.vue")
      },
      {
        path: "/manageSys/passWord",
        name: "passWord",
        meta: { name: "修改密码" },
        component: () => import("@/views/manageSys/passWord.vue")
      }
    ]
  },
  {
    path: "/common",
    component: main,
    meta: { name: "通用", icon: "el-icon-star-on" },
    children: [
      {
        path: "/home",
        component: () => import("@/views/home.vue"),
        meta: { name: "首页1" }
      },
      {
        path: "/common/table",
        meta: { name: "表格" },
        component: () => import("@/views/table.vue")
      },
      {
        path: "/common/form",
        meta: { name: "表单" },
        component: () => import("@/views/form.vue")
      }
    ]
  },
  {
    path: "/rights",
    component: main,
    meta: { name: "权限控制", icon: "el-icon-setting" },
    children: [
      {
        path: "/hasRight",
        component: () => import("@/views/home.vue"),
        meta: { name: "有权限" }
      },
      {
        path: "/noRight",
        component: () => import("@/views/home.vue"),
        meta: { name: "无权限", p: "123asdad" }
      }
    ]
  },
  {
    path: "/level",
    component: main,
    meta: { name: "level1" },
    children: [
      {
        path: "/level1-1",
        meta: { name: "层级1-1" },
        component: () => import("@/components/level.vue"),
        children: [
          {
            path: "/level1-1-1",
            meta: { name: "层级1-1-1" },
            component: () => import("@/components/level.vue"),
            children: [
              {
                path: "/level1-1-1-1",
                meta: { name: "层级1-1-1-1" },
                component: () => import("@/components/level.vue")
              },
              {
                path: "/level1-1-1-2",
                meta: { hidden: true, name: "层级1-1-1-2" },
                component: () => import("@/components/level.vue")
              }
            ]
          }
        ]
      },
      {
        path: "/level1-2",
        meta: { name: "层级1-2" },
        component: () => import("@/components/level.vue")
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
