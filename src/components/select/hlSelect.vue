<template>
  <div>
    <el-select v-model="selectHL" placeholder="请选择H/L">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>



<script>
import { dict } from "@/utils/base.js";
export default {
  name: "hlSelect",
  data() {
    return {
      selectHL: "",
      options: dict.HL_MODE
    };
  },
  watch: {
    //判断下拉框的值是否有改变
    selectHL(val, oldVal) {
      console.log(val);
      if (oldVal != val) {
        this.$emit("hlSelect", val);
      }
    }
  }
};
</script>