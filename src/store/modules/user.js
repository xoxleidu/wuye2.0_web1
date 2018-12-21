var userData = JSON.parse(localStorage.CCCTSUSER || "{}");
const user = {
  state: {
    token: userData.token || "", //token
    rights: userData.rights || [], //用户权限范围
    loginTime: "", //登陆日期 判断用户失效
    userId: userData.userId || "", //用户ID
    name: userData.name || "", //昵称
    passWord: "",
    userName: ""
  },
  mutations: {
    loginIn(state, userInfo) {
      state.name = userInfo.name;
      state.rights = userInfo.rights.split(",");
      state.userId = userInfo.userId;
      state.token = userInfo.token;
      state.passWord = userInfo.passWord;
      state.userName = userInfo.userName;
      localStorage.setItem("CCCTSUSER", JSON.stringify(state));
    },
    clearLoginInfo() {
      localStorage.removeItem("CCCTSUSER");
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
      return state.userId;
      
    },
    isLogin: state => {
      return !!state.token;
    }
  }
};

export default user;
