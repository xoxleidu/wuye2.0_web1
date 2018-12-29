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
          <el-form-item label="小区名" prop="communityName">
            <el-input v-model="postData.communityName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属办公室" prop="officeId">
            <office-select class="base-select" v-model="postData.officeId"></office-select>
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
import { addCommunity } from "@/api/estate.js";
import officeSelect from "@/components/select/office-select.vue";
export default {
  components: { officeSelect },
  data() {
    return {
      loading: false,
      postData: {
        communityName: "",
        officeId: ""
      },
      rules: {
        communityName: [this.$rules.required, this.$rules.length({ min: 6 })],
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs["postForm"].validate(valid => {
        if (valid) {
          this.loading = true;

          addCommunity(this.postData)
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
