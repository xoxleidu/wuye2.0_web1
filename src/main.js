import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";

import Element from "element-ui";
import "@/style/variables.scss";

Vue.use(Element);

import "normalize.css";
Vue.config.productionTip = false;
import "element-theme-chalk";
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
