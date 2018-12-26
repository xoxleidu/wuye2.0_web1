<template>
  <div>
    <div class="block">
      <el-date-picker
        v-model="dateSelect"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
      ></el-date-picker>
    </div>
  </div>
</template>
<script>
import { Message } from "element-ui";
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value4: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      dateSelect: ""
    };
  },
  created() {
    //console.log(timestampToTime(1545235200));
  },
  watch: {
    dateSelect(value) {
      console.log(value);
      if (value[0].valueOf() != value[1].valueOf()) {
        var val = {
          startTime: Date.parse(this.dateSelect[0]) / 1000,
          endTime: Date.parse(this.dateSelect[1]) / 1000
        };
        this.$emit("dateSelect", val);
      } else {
        Message({
          message: "起始时间不能一样",
          type: "error",
          duration: 5 * 1000
        });
      }
    }
  }
};
</script>