<template>
  <div>
    <el-select v-model="selectOffice" placeholder="请选择物业办公室-可搜索" filterable>
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>



<script>
import { getOffice } from "@/api/estate";
export default {
  name: "officeSelect",
  data() {
    return {
      selectOffice: "",
      options: {}
    };
  },
  props: {
    value: {
      type: Number,
      default: ""

    }, //接受外部v-model传入的值
    fileType: {
      type: Object
    } //定义请求回来的json数据格式
  },
  watch: {
    //判断下拉框的值是否有改变
    selectOffice(val, oldVal) {
      console.log("new: %s, old: %s", val, oldVal);
      if (val != oldVal) {
        this.$emit("change", this.selectOffice);
      }
    }
  },
  mounted() {
    //初始话下拉框的值
    this.selectOffice = this.value;
    console.log("传过来的值");
    console.log(this.selectOffice);
    //this.options = {};
    //后台获取
    getOffice().then(res => {
      console.log(res);
      this.options = this.dataTransform(res.data.data.records);
      //this.user = res.data.records
    });
  },
  methods: {
    dataTransform(data) {
      let _data = [];
      for (let i = 0; i < data.length; i++) {
        _data[i] = {};
        _data[i].label = data[i].label;
        _data[i].value = data[i].officeId;
      }
      return _data;
    }
  }
};
</script>