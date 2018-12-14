import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import Element from "element-ui";
// import "@/style/variables.scss";//如果需要定制element UI 皮肤，可参考该文件配置
import "normalize.css";
import "element-theme-chalk"; //如果需要定制element UI 皮肤，删除该行
Vue.use(Element);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
