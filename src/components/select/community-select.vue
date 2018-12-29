<template>
  <div class="block">
    <el-cascader class="base-select" v-model="selected" placeholder="请选择小区-可搜索" :options="options" filterable></el-cascader>
  </div>
</template>



<script>
import { getCommunityTree } from "@/api/estate";
export default {
  name: "community-Select",
  props: ["value"],
  data() {
    return {
      selected: [],
      options: []
    };
  },
  watch: {
    value: function(newVal) {
      this.selected = newVal;
    },
    selected: function(newVal) {
      //console.log("new: %s, old: %s", newVal, oldVal);
      this.$emit("input", newVal);
    }
    //判断下拉框的值是否有改变
    // selected(val, oldVal) {
    //   console.log(val);
    //   if (oldVal.toString() != val.toString()) {
    //     this.$emit("communitySelect", val[val.length - 1]);
    //   }
    // }
  },
  mounted() {
    //初始话下拉框的值
    //this.options = [];
    //后台获取
    getCommunityTree()
      .then(res => {
        console.log(res);
        this.options = res.data.data;
      })
      .catch(err => {
        console.warn(err);
      });
  }
};
</script>