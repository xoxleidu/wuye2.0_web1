export default {
  namespaced: true,
  state: {
    data: new Map(),
    dataVersion: 0
  },
  mutations: {
    addAsk(state, ask) {
      state.dataVersion++;
      state.data.set(ask.SimID, ask);
    },
    answer(state, answer) {
      var ask = state.data.get(answer.SimID);
      if (ask) {
        ask.answer = answer;
        state.dataVersion++;
      }
    },
    remove(state, sim_id) {
      if (state.data.has(sim_id)) {
        state.data.delete(sim_id);
        state.dataVersion++;
      }
    },
    removeAll(state) {
      state.dataVersion++;
      this.data = new Map();
    }
  },
  actions: {},
  getters: {
    askList: function(state) {
      void state.dataVersion;
      return Array.from(state.data.values());
    }
  }
};
