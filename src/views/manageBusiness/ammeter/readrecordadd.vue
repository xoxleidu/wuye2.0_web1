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
        <el-col :span="24">
          <el-form-item label="日期" prop="yearMonth">
            <onedate-select class="base-select" v-model="postData.yearMonth"></onedate-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="起始表底" prop="minNumber">
            <el-input v-model="postData.minNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束表底" prop="maxNumber">
            <el-input v-model="postData.maxNumber"></el-input>
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
import { addAmmeterRecord } from "@/api/manage.js";
import onedateSelect from "@/components/select/onedate-select.vue";
export default {
  components: { onedateSelect },
  data() {
    return {
      loading: false,
      postData: {},
      rules: {
        yearMonth: [this.$rules.required],
        maxNumber: [this.$rules.required],
        minNumber: [this.$rules.required],
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs["postForm"].validate(valid => {
        if (valid) {
          this.loading = true;

          addAmmeterRecord(this.postData)
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
