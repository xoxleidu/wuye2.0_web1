var userData = JSON.parse(localStorage.BEIDOU || "{}");
const user = {
  state: {
    token: userData.token || "", //token
    rights: userData.rights || [], //用户权限范围
    loginTime: "", //登陆日期 判断用户失效
    user_id: userData.user_id || "", //用户ID
    real_name: userData.real_name || "", //昵称
    pass_word: "",
    user_name: ""
  },
  mutations: {
    loginIn(state, userInfo) {
      state.real_name = userInfo.real_name;
      state.rights = userInfo.rights.split(",");
      state.user_id = userInfo.user_id;
      state.token = userInfo.token;
      state.pass_word = userInfo.pass_word;
      state.user_name = userInfo.user_name;
      localStorage.setItem("BEIDOU", JSON.stringify(state));
    },
    clearLoginInfo() {
      localStorage.removeItem("BEIDOU");
    }
  },
  actions: {
    loginOut(context) {
      return new Promise(resolve => {
        context.commit("clearLoginInfo");
        resolve();
      });
    }
  },
  getters: {
    user_id: state => {
      return state.user_id;
    },
    isLogin: state => {
      return !!state.token;
    }
  }
};

export default user;
