<template>
  <div>
    <el-select v-model="selectPay" placeholder="请选择支付方式">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>



<script>
import { dict } from "@/utils/base.js";
export default {
  name: "paySelect",
  data() {
    return {
      selectPay: "",
      options: dict.PAY_MODE
    };
  },
  watch: {
    //判断下拉框的值是否有改变
    selectPay(val, oldVal) {
      console.log(val);
      if (oldVal != val) {
        this.$emit("paySelect", val);
      }
    }
  }
};
</script>