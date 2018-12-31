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
          <el-form-item label="角色" prop="roleId">
            <role-select class="base-select" v-model="postData.roleId"></role-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属办公室" prop="officeId">
            <office-select class="base-select" v-model="postData.officeId"></office-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="postData.userName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证号" prop="idcard">
            <el-input v-model="postData.idcard"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="mobile">
            <el-input v-model="postData.mobile"></el-input>
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
import { updateUser, getUser } from "@/api/index.js";
import roleSelect from "@/components/select/role-select.vue";
import officeSelect from "@/components/select/office-select.vue";
export default {
  components: { roleSelect,officeSelect },
  data() {
    return {
      loading: false,
      postData: {
        userId: "",
        userName: "",
        idcard: "",
        mobile: "",
        officeId: "",
        roleId: "",
        status: 1
      },
      rules: {
        userName: [this.$rules.required, this.$rules.length({ min: 6 })]
      }
    };
  },
  props: ["id"],
  created() {
    this.postData.userId = this.$props.id;
    getUser(this.$props.id).then(res => {
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
          updateUser(this.postData)
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
