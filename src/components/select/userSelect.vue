<template>
  <div>
    <el-select v-model="selectUser" placeholder="请选择用户-可搜索" filterable>
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>



<script>
import { getUser } from "@/api/user";
export default {
  name: "userSelect",
  data() {
    return {
      selectUser: "",
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
    selectUser(val, oldVal) {
      console.log("new: %s, old: %s", val, oldVal);
      if (val != oldVal) {
        this.$emit("userSelect", this.selectUser);
      }
    }
  },
  mounted() {
    //初始话下拉框的值
    this.options = {};
    //后台获取
    getUser().then(res => {
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
        _data[i].label = data[i].name;
        _data[i].value = data[i].id;
      }
      return _data;
    }
  }
};
</script>