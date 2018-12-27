import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import Element from "element-ui";
import "normalize.css";
import "@/style/index.scss";
import { utils, dict } from "@/utils/base";
import rules from "@/utils/rules";
// import "@/style/cover-element.scss";//如果需要定制element UI 皮肤，可参考该文件配置
import "element-theme-chalk";
Vue.use(Element);
Vue.config.productionTip = false;
Vue.prototype.$utils = utils;
Vue.prototype.$dict = dict;
Vue.prototype.$rules = rules;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

var data = [
  {
    id: 1,
    parentId: 0,
    name: "首页"
  },
  {
    id: 2,
    parentId: 1,
    name: "a"
  },
  {
    id: 3,
    parentId: 1,
    name: "b"
  },
  {
    id: 4,
    parentId: 3,
    name: "c"
  },
  {
    id: 5,
    parentId: 4,
    name: "d"
  },
  {
    id: 6,
    parentId: 3,
    name: "e"
  },
  {
    id: 7,
    parentId: 0,
    name: "首页1"
  }
];

var dictX = {};
var root = [];
var childrens = data.filter(item => {
  item.children = [];
  dictX[item.id] = item;
  if (item.parentId == 0) {
    root.push(item);
    return false;
  } else {
    return true;
  }
});
childrens.map(item => {
  dictX[item.parentId].children.push(item);
});
console.log(root);
