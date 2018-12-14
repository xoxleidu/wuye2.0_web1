<template>
  <div>
    <el-card shadow="always" class="admin-table-search">
      <el-form
        :model="tableQuery"
        label-width="80px"
        :label-position="isCollapse?'top':'left'"
        class="table-search"
        size="small"
        @submit.native.prevent
      >
        <el-row :gutter="30">
          <el-col :span="6">
            <el-form-item label="姓名">
              <el-input v-model="tableQuery.user_name" placeholder="姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="年龄">
              <el-input v-model="tableQuery.age" placeholder="年龄"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" v-show="isCollapse">
            <el-form-item label="性别">
              <el-select v-model="tableQuery.sex" placeholder="性别" style="width:100%;" clearable>
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="isCollapse?24:6" style="text-align: right;">
            <el-form-item>
              <el-button type="primary" @click="isCollapse=!isCollapse" v-if="isCollapse">收起</el-button>
              <el-button type="primary" @click="isCollapse=!isCollapse" v-if="!isCollapse">展开</el-button>
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
    <el-table
      :data="tableData.data"
      v-loading="tableLoading"
      style="width: 100%;"
      class="admin-table-list"
    >
      <el-table-column prop="user_name" label="姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="delRow(scope)" icon="el-icon-delete">删除</el-button>
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
  </div>
</template>

<script>
import { getUser } from "@/api/index.js";
export default {
  created() {
    this.getTable();
  },
  data() {
    return {
      isCollapse: false,
      tableLoading: false,
      tableQuery: {
        page: 1,
        size: 10,
        user_name: "",
        sex: ""
      },
      tableData: {
        data: [],
        total: 0
      }
    };
  },
  methods: {
    // 查询信息
    getTable() {
      this.tableLoading = true;
      getUser(this.tableQuery)
        .then(res => {
          this.tableLoading = false;
          if (res.data.code == 0) {
            this.$set(this.tableData, "data", res.data.data);
            this.tableData.total = res.data.total;
          }
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
