<template>
  <div style="width:100%">
    <el-form
      ref="postForm"
      label-position="right"
      label-width="100px"
      :model="postData"
      status-icon
      :rules="rules"
      size="medium"
      @submit.native.prevent="handleSubmit"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="支出类型" prop="payTypeName">
            <el-input v-model="postData.payTypeName"></el-input>
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
import { updatePayType, getPayType } from "@/api/manage.js";
export default {
  data() {
    return {
      loading: false,
      postData: {
        payTypeId: "",
        payTypeName: "",
      },
      rules: {
        buildingName: [this.$rules.required, this.$rules.length({ min: 6 })]
      }
    };
  },
  props: ["id"],
  created() {
    this.postData.payTypeId = this.$props.id;
    getPayType(this.$props.id).then(res => {
      if (res.data.code == 0) {
        Object.assign(this.postData, res.data.data);
      }
    });
  },
  methods: {
    handleSubmit() {
      this.$refs["postForm"].validate(valid => {
        if (valid) {
          this.loading = true;
          console.log(this.postData);
          updatePayType(this.postData)
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
