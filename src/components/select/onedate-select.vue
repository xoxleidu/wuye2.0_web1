<template>
  <div>
    <div class="block">
      <el-date-picker  v-model="dateSelect" type="date" placeholder="选择日期"></el-date-picker>
    </div>
  </div>
</template>
<script>
import { Message } from "element-ui";
export default {
  data() {
    return {
      dateSelect: ""
    };
  },
  created() {
    //console.log(timestampToTime(1545235200));
  },
  watch: {
    dateSelect(value) {
      if (value) {
        this.$emit("dateSelect", Date.parse(value) / 1000);
      } else {
        Message({
          message: "请选择时间",
          type: "error",
          duration: 5 * 1000
        });
      }
    }
  }
};
</script>