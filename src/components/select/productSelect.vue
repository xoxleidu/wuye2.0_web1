<template>
  <div>
    <el-select v-model="selectProduct" placeholder="请选择物产">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>



<script>
import { getEstate } from "@/api/estate";
export default {
  name: "productSelect",
  data() {
    return {
      selectProduct: "",
      options: {}
    };
  },
  props: {
    val: {
      type: String
    }, //接受外部v-model传入的值
    fileType: {
      type: Object
    } //定义请求回来的json数据格式
  },
  watch: {
    //判断下拉框的值是否有改变
    selectProduct(val, oldVal) {
      console.log(val);
      if (oldVal != val) {
        this.$emit("productSelect", val);
      }
    }
  },
  mounted() {
    //初始话下拉框的值
    this.options = {};
    //后台获取
    getEstate().then(res => {
      console.log(res);
      this.options = res.data.data.records;
    });
  }
};
</script>