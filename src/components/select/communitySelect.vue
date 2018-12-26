<template>
  <div class="block">
    <el-cascader v-model="selectCommunity" placeholder="请选择小区-可搜索" :options="options" filterable></el-cascader>
  </div>
</template>



<script>
import { getCommunityTree } from "@/api/estate";
export default {
  name: "communitySelect",
  data() {
    return {
      selectCommunity: [],
      options: []
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
    selectCommunity(val, oldVal) {
      console.log(val);
      if (oldVal.toString() != val.toString()) {
        this.$emit("communitySelect", val[val.length - 1]);
      }
    }
  },
  mounted() {
    //初始话下拉框的值
    this.options = [];
    //后台获取
    getCommunityTree().then(res => {
      console.log(res);
      this.options = res.data.data.records;
    });
  }
};
</script>