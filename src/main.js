import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import Element from "element-ui";
import "normalize.css";
import { utils, dict } from "@/utils/base";
// import "@/style/cover-element.scss";//如果需要定制element UI 皮肤，可参考该文件配置
import "element-theme-chalk"; //如果需要定制element UI 皮肤，删除该行
Vue.use(Element);
Vue.config.productionTip = false;
Vue.prototype.$utils = utils;
Vue.prototype.$dict = dict;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
