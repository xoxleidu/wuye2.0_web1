<template>
  <div>
    <el-form
      v-for="p in permissionData"
      :key="p.name"
      class="table-group"
      size="small"
      @submit.native.prevent
    >
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
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      permissionData: [
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
    };
  }
};
</script>
<style>
.table-group {
  background-color: beige;
}
</style>


