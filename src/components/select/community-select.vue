<template>
<div>
    <el-select class="base-select" v-model="selected" placeholder="请选择小区-可搜索" filterable>
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
  <!-- <div class="block">
    <el-cascader class="base-select" v-model="selected" placeholder="请选择小区-可搜索" :options="options" filterable></el-cascader>
  </div> -->
</template>



<script>
import { getCommunityAll } from "@/api/estate";
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
      //var _newVal = newVal[newVal.length - 1]
      //console.log(_newVal)
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
    getCommunityAll()
      .then(res => {
        console.log(res);
        this.options = this.dataTransform(res.data.data);
      })
      .catch(err => {
        console.warn(err);
      });
  },
  methods: {
    dataTransform(data) {
      let _data = [];
      for (let i = 0; i < data.length; i++) {
        _data[i] = {};
        _data[i].label = data[i].communityName;
        _data[i].value = data[i].communityId;
      }
      return _data;
    }
  }
};
</script>