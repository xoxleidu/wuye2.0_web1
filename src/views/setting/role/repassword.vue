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
          <el-form-item label="原密码" prop="userPwdOld">
            <el-input type="password" v-model="postData.userPwdOld" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="新密码" prop="userPwd">
            <el-input type="password" v-model="postData.userPwd" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="重复新密码" prop="checkPass">
            <el-input type="password" v-model="postData.checkPass" autocomplete="off"></el-input>
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
import { updatePassword } from "@/api/index.js";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.postData.checkPass !== "") {
          this.$refs.postForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.postData.userPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      postData: {
        userId: "",
        userPwdOld: "",
        userPwd: "",
        checkPass: ""
      },
      rules: {
        userPwdOld: [this.$rules.required],
        userPwd: [
          this.$rules.required,
          { validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          this.$rules.required,
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  props: ["id"],
  created() {
    this.postData.userId = this.$props.id;
    console.log(this.postData.userId);
  },
  methods: {
    handleSubmit() {
      this.$refs["postForm"].validate(valid => {
        if (valid) {
          this.loading = true;
          updatePassword(this.postData)
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

