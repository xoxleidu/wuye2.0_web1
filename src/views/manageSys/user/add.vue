<template>
  <div style="width:100%">
    <el-form
      ref="postForm"
      label-position="left"
      label-width="120px"
      :model="postData"
      status-icon
      :rules="rules"
      size="medium"
      @submit.native.prevent="handleSubmit"
    >
      <el-row :gutter="20">
        <el-col>
          <el-form-item label="考场名称" prop="placeName">
            <el-input v-model="postData.placeName" placeholder="考场名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="责任人">
            <el-input v-model="postData.man" placeholder="责任人"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="联系方式">
            <el-input v-model="postData.tel" placeholder="联系方式"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item>
            <el-button type="primary" native-type="submit" :loading="loading">提交</el-button>
            <el-button @click="()=>{ this.$emit('end')}">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { addPlace } from "@/api/index.js";
export default {
  data() {
    return {
      loading: false,
      postData: {
        placeName: "",
        tel: "",
        man: ""
      },
      rules: {
        placeName: [this.$rules.required],
        tel: [],
        man: []
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs["postForm"].validate(valid => {
        if (valid) {
          this.loading = true;
          addPlace(this.postData)
            .then(res => {
              this.$utils.callResponse(this, res);
            })
            .catch(err => {
              console.warn(err);
            });
        } else {
          this.$message.warning("请填写正确信息！");
          return false;
        }
      });
    }
  }
};
</script>

<style>
</style>
