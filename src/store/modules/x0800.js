export default {
  namespaced: true,
  state: {
    data: new Map(),
    dataVersion: 0
  },
  mutations: {
    add(state, data) {
      state.dataVersion++;
      data.id = state.dataVersion;
      state.data.set(data.id, data);
    },
    remove(state, id) {
      if (state.data.has(id)) {
        state.data.delete(id);
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
    list: function(state) {
      void state.dataVersion;
      return Array.from(state.data.values());
    }
  }
};
