<template>
  <div>
    <el-select class="base-select" v-model="selected" placeholder="请选择物业办公室-可搜索" filterable>
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>

<script>
import { getOfficeList } from "@/api/estate";
export default {
  name: "office-select",
  props: ["value"],
  data() {
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
    //this.selectOffice = this.value;
    console.log("传过来的值");
    console.log(this.selectOffice);
    //this.options = {};
    //后台获取
    getOfficeList()
      .then(res => {
        console.log(res);
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
        _data[i].label = data[i].officeName;
        _data[i].value = data[i].officeId;
      }
      return _data;
    }
  }
};
</script>