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
          <el-form-item label="角色名" prop="roleName">
            <el-input v-model="postData.roleName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="permission" v-for="p in postData.permission" :key="p.id">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>{{p.pname}}</span>
                <el-radio border label="全选"></el-radio>
              </div>
              <el-form-item :label="p.name">
                <el-radio-group v-for="v in p.permission" :key="v" size="medium">
                  <el-radio border v-model="permission" v-if="v==0" :label="v">{{v}}查看</el-radio>
                  <el-radio border v-model="permission" v-if="v==1" :label="v">{{v}}控制</el-radio>
                  <el-radio border v-model="permission" v-if="v==2" :label="v">{{v}}删除</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-card>
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
import { addRole } from "@/api/index.js";
export default {
  data() {
    return {
      loading: false,
      postData: {
        roleName: "",
        permission: [
        {
          pname: "首页",
          name: "首页",
          permission: [0, 1, 2]
        },
        {
          pname: "业务管理",
          name: "物产信息管理",
          permission: [0, 1, 2]
        }
      ]
      },
      rules: {
        roleId: [this.$rules.required],
        roleName: [this.$rules.required, this.$rules.length({ min: 6 })]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs["postForm"].validate(valid => {
        if (valid) {
          this.loading = true;
          addRole(this.postData)
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
