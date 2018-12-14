export default {
  state: {
    singleVehiclesSet: new Set(), //单车监控标签
    singleVehiclesLog: 0, //触发computed
    currentTab: "index",
    tabs: [], //标签管理（单车监控标签通过singleVehicle管理）
    monitorAlarmVehicle: {}, //报警对应的车辆
    monitorErrorVehicle: {}, //异常对应的车辆
    monitorTrackVehicle: {}, //轨迹对应的车辆
    setMonitorMediaVehicle: {} //媒体列表对应车辆
  },
  mutations: {
    openSingleVehicle(state, vehicle) {
      state.singleVehiclesSet.add(vehicle);
      state.currentTab = "single-" + vehicle.sim_id;
      state.singleVehiclesLog++;
    },
    closeSingleVehicle(state, vehicle) {
      state.singleVehiclesLog++;
      state.singleVehiclesSet.delete(vehicle);
      state.currentTab = "index";
    },
    changeCurrentTag(state, tabName) {
      state.curerntTab = tabName;
    },
    openTab(state, tabName) {
      state.currentTab = tabName;
      if (state.tabs.indexOf(tabName) == -1) {
        state.tabs.push(tabName);
      }
    },
    closeTab(state, tabName) {
      state.currentTab = "index";
      var index = state.tabs.indexOf(tabName);
      if (index != -1) {
        state.tabs.splice(index, 1);
      }
    },
    setMonitorAlarmVehicle(state, vehicle) {
      state.monitorAlarmVehicle = vehicle;
      this.commit("openTab", "alarm");
    },
    setMonitorErrorVehicle(state, vehicle) {
      state.monitorErrorVehicle = vehicle;
      this.commit("openTab", "error");
    },
    setMonitorTrackVehicle(state, vehicle) {
      state.monitorTrackVehicle = vehicle;
      this.commit("openTab", "track");
    },
    setMonitorMediaVehicle(state, vehicle) {
      state.monitorMediaVehicle = vehicle;
      this.commit("openTab", "media");
    }
  },
  actions: {},
  getters: {
    singleVehicles: function(state) {
      void state.singleVehiclesLog;
      return Array.from(state.singleVehiclesSet);
    }
  }
};
