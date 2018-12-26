<template>
  <div>
    <el-select v-model="SelectPricingModel" placeholder="请选择计费模式">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>



<script>
import { dict } from "@/utils/base.js";
export default {
  name: "pricingModelSelect",
  data() {
    return {
      SelectPricingModel: "",
      options: dict.PRICING_MODE
    };
  },
  watch: {
    //判断下拉框的值是否有改变
    SelectPricingModel(val, oldVal) {
      console.log(val);
      if (oldVal != val) {
        this.$emit("pricingModelSelect", val);
      }
    }
  }
};
</script>