//需要人工确认的报警消息
import { dict } from "@/utils/base.js";
import utils from "@/utils/utils.js";
var sureAlarm = [
  "1",
  "8",
  "1048576",
  "2097152",
  "4194304",
  "134217728",
  "268435456"
]; //需要人工确认的报警消息列表
export default {
  namespaced: true,
  state: {
    data: new Map(),
    dataVersion: 0
  },
  mutations: {
    add(state, data) {
      var keys = dict.getAlarmKey(data.alarm);
      var isArtificial = keys.some(key => {
        return sureAlarm.indexOf(key.toString()) != -1;
      });

      if (isArtificial) {
        state.dataVersion++;
        data.alarmKeys = keys;
        data.alarmText = dict.getAlarm(data.alarm);
        state.data.set(data.sim_id, data);
      }
    },
    remove(state, data) {
      var sim_id = utils.unFormatSim(data.SimID);
      if (state.data.has(sim_id)) {
        var alarmObj = state.data.get(sim_id);
        var index = alarmObj.alarmKeys.indexOf(data.AlarmFlag.toString());
        alarmObj.alarmKeys.splice(index, 1);
        var isArtificial = alarmObj.alarmKeys.some(key => {
          return sureAlarm.indexOf(key.toString()) != -1;
        });
        if (!isArtificial) {
          state.data.delete(sim_id);
        }
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
