import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import monitor from "./modules/monitor";
import QA from "./modules/QA";
import x0701 from "./modules/x0701";
import x0301 from "./modules/x0301";
import x0303 from "./modules/x0303";
import alarm from "./modules/alarm";
import x0800 from "./modules/x0800";
import x0900 from "./modules/x0900";
import x0901 from "./modules/x0901";
import x809 from "./modules/809";
import x809In from "./modules/809-in";
Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    user,
    monitor,
    QA,
    x0701,
    x0301,
    x0303,
    alarm,
    x0800,
    x0900,
    x0901,
    x809,
    x809In
  }
});

export default store;
