<template>
  <div>
    <el-select class="base-select" v-model="selected" placeholder="请选择支出类型">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>



<script>
import { getPayTypeAll } from "@/api/manage.js";
export default {
  name: "paytype-Select",
  props: ["value"],
  data: function() {
    return {
      selected: "",
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
  },

  created() {
    //初始话下拉框的值

    //this.selected = this.value;
    //this.options = {};
    //后台获取
    getPayTypeAll()
      .then(res => {
        //console.log(res);
        this.options = this.dataTransform(res.data.data);
        //this.user = res.data.records
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
        _data[i].label = data[i].payTypeName;
        _data[i].value = data[i].payTypeId;
      }
      return _data;
    }
  }
};
</script>