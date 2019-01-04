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
          <el-form-item label="所属小区" prop="communityId">
            <community-select class="base-select" v-model="postData.communityId"></community-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="支出类型" prop="payTypeId">
            <paytype-select v-model="postData.payTypeId"></paytype-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="支出用途" prop="payName">
            <el-input v-model="postData.payName"></el-input>
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
import { addPay } from "@/api/financial.js";
import communitySelect from "@/components/select/community-select.vue";
import paytypeSelect from "@/components/select/paytype-select.vue";
export default {
  components: { communitySelect, paytypeSelect },
  data() {
    return {
      loading: false,
      postData: {
        payName: "",
        communityId: null,
        payTypeId: null
      },
      rules: {
        payName: [this.$rules.required],
        communityId: [this.$rules.required],
        payTypeId: [this.$rules.required]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs["postForm"].validate(valid => {
        if (valid) {
          this.loading = true;

          addPay(this.postData)
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
