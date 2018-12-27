<template>
  <div>
    <el-card shadow="hover" class="admin-table-search">
      <el-form
        :model="tableQuery"
        label-width="80px"
        label-position="left"
        class="table-search"
        size="small"
        @submit.native.prevent
      >
        <el-row :gutter="30">
          <el-col :span="6">
            <el-form-item label="用户名">
              <el-input v-model="tableQuery.username" placeholder="用户名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <role-select></role-select>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button
                type="primary"
                @click="searchTable"
                :loading="tableLoading"
                native-type="submit"
              >查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <div class="admin-methdos-btns">
      <el-button @click="openAdd()" size="medium" type="primary" icon="el-icon-plus">新增</el-button>
    </div>
    <el-table
      border
      stripe
      size="small"
      :data="tableData.data"
      v-loading="tableLoading"
      style="width: 100%;"
      class="admin-table-list"
    >
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="username" label="用户名1"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="openEdit(scope)" icon="el-icon-edit">编辑</el-button>
          <el-button size="mini" @click="openRepassword(scope)" icon="el-icon-edit">修改密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="float:right;margin-top:10px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="tableQuery.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="tableQuery.size"
        :total="tableData.total"
        layout="total, sizes, prev, pager, next, jumper"
        background
      ></el-pagination>
    </div>
    <el-dialog title="添加" :visible.sync="addDialog" width="40%" center>
      <add
        :key="addKey"
        @success="()=>{this.getTable();this.addDialog=false}"
        @end="()=>{this.addDialog=false}"
      ></add>
    </el-dialog>
    <el-dialog title="编辑" :visible.sync="editDialog" width="40%" center>
      <edit
        :key="addKey"
        :id="editId"
        @success="()=>{this.getTable();this.editDialog=false;this.editId='';}"
        @end="()=>{this.editDialog=false;this.editId='';}"
      ></edit>
    </el-dialog>
    <el-dialog title="修改密码" :visible.sync="repasswordDialog" width="40%" center>
      <repassword
        :key="addKey"
        :id="editId"
        @success="()=>{this.getTable();this.editDialog=false;this.editId='';}"
        @end="()=>{this.repasswordDialog=false;this.editId='';}"
      ></repassword>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList } from "@/api/index.js";
import add from "./add.vue";
import edit from "./edit.vue";
import repassword from "./repassword.vue";
import roleSelect from "@/components/select/role-select.vue";
export default {
  components: { add, edit, repassword, roleSelect },
  created() {
    this.getTable();
  },
  data() {
    return {
      addKey: 0, //通过key来让组件重新渲染，以便清除上次数据
      addDialog: false,
      editDialog: false,
      editId: "",
      repasswordDialog: false,
      tableLoading: false,
      tableQuery: {
        page: 1,
        size: 10,
        userName: ""
      },
      tableData: {
        data: [],
        total: 0
      }
    };
  },
  methods: {
    goVehicle(scope) {
      this.$router.push({
        name: "vehicle",
        param: { vehicleId: scope.row.scopeId }
      });
    },
    goProject(scope) {
      this.$router.push({
        name: "project",
        param: { vehicleId: scope.row.scopeId }
      });
    },
    //添加
    openAdd() {
      this.addKey++;
      this.addDialog = true;
    },

    //编辑
    openEdit(scope) {
      this.addKey++;
      this.editId = scope.row.userId;
      this.editDialog = true;
    },
    //修改密码
    openRepassword(scope) {
      this.addKey++;
      this.editId = scope.row.userId;
      this.repasswordDialog = true;
    },
    // 查询信息
    getTable() {
      this.tableLoading = true;
      getUserList(this.tableQuery)
        .then(res => {
          this.tableLoading = false;
          var result = [];
          if (res.data.code == 0) {
            result = res.data.data;
            this.tableData.total = res.data.total;
          } else {
            this.$message.error(res.data.msg);
          }
          this.$set(this.tableData, "data", result);
        })
        .catch(err => {
          this.tableLoading = false;
          console.warn(err);
        });
    },
    searchTable() {
      this.tableQuery.page = 1;
      this.getTable();
    },
    //删除行
    delRow(scope) {
      console.log(scope);
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 每页数量切换
    handleSizeChange(val) {
      this.tableQuery.page = 1;
      this.tableQuery.size = val;
      this.getTable();
    },
    // 页数切换
    handleCurrentChange(val) {
      this.tableQuery.page = val;
      this.getTable();
    }
  }
};
</script>

<style>
</style>
