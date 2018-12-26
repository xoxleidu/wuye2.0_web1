<template>
  <div>
    <el-select v-model="selectEnable" placeholder="请选择状态">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>



<script>
import { dict } from "@/utils/base.js";
export default {
  name: "enableSelect",
  data() {
    return {
      selectEnable: "",
      options: dict.ENABLE_MODE
    };
  },
  watch: {
    //判断下拉框的值是否有改变
    selectEnable(val, oldVal) {
      console.log(val);
      if (oldVal != val) {
        this.$emit("enableSelect", val);
      }
    }
  }
};
</script>