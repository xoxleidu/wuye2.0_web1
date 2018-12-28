<template>
  <div>
    <!-- <el-card shadow="always" class="admin-table-search">
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
    </el-card>-->
    <el-button type="primary" @click="handleCreate">添加小区</el-button>
    <el-button type="danger" @click="deleteAll">删除选中</el-button>
    <el-table
      :data="tableData.records"
      v-loading="tableLoading"
      style="width: 100%;"
      class="admin-table-list"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="communityName" label="小区名称"></el-table-column>
      <el-table-column prop="officeName" label="所属办公室"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="handleUpdata(scope)" type="primary">修改</el-button>
          <el-button size="small" @click="delRow(scope)" type="danger">删除</el-button>
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
      
      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form
          ref="dataForm"
          :model="temp"
          label-position="left"
          label-width="70px"
          style="width: 800px; margin-left:20px;"
        >
          <el-row :gutter="20" class="form-row">
            <el-col :span="3">
              <div class="from-left-title">小区名称</div>
            </el-col>
            <el-col :span="16">
              <div class="from-value">
                <el-input v-model="temp.communityName"/>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="form-row">
            <el-col :span="3">
              <div class="from-left-title">所属办公室</div>
            </el-col>
            <el-col :span="16">
              <div>{{temp.officeName}}
                <!-- v-on:officeSelect="office($event)" -->
                
                <office-select v-model="temp.officeName" @change="setOffice($event)"></office-select>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Clean</el-button>
          <el-button
            type="primary"
            @click="dialogStatus==='create'?createData():updateData()"
          >{{ dialogbutton }}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getCommunity,
  addCommunity,
  updateCommunity,
  deleteCommunity,
  deleteManyCommunity
} from "@/api/estate";
import officeSelect from "@/components/select/office-select.vue";
export default {
  components: { officeSelect },
  created() {
    this.getTable();
  },
  data() {
    return {
      restData: "",
      isCollapse: false,
      tableLoading: false,
      tableQuery: {
        page: 1,
        size: 10
      },
      tableData: {
        records: [],
        total: 0
      },
      temp: {},
      textMap: {
        update: "修改",
        create: "添加"
      },
      dialogStatus: "",
      dialogbutton: "",
      dialogFormVisible: false,
      multipleSelection: []
    };
  },
  methods: {
    // 查询信息
    getTable() {
      this.tableLoading = true;
      getCommunity()
        .then(res => {
          this.tableLoading = false;
          console.log(res.data.data.total);
          console.log(res.data.data.records);
          if (res.data.code == "0000") {
            this.$set(this.tableData, "records", res.data.data.records);
            this.tableData.total = res.data.data.total;
          }
          console.log(this.tableData);
        })
        .catch(err => {
          this.tableLoading = false;
          console.warn(err);
        });
    },
    //选择办公室
    office(msg) {
      console.log(msg);
    },
    setOffice(msg) {
      console.log(msg);
    },
    //添加数据
    handleCreate() {
      this.temp = {};
      this.dialogStatus = "create";
      this.dialogbutton = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      addCommunity().then(res => {
        console.log(res);
      });
      // addCommunity(this.temp).then(res => {
      //   if (res.code == "0000") {
      //     this.temp.id = res.data.data.records;
      //     this.tableData.unshift(this.temp);
      //     this.dialogFormVisible = false;
      //     this.$notify({
      //       title: "成功",
      //       message: "创建成功",
      //       type: "success",
      //       duration: 2000
      //     });
      //   } else {
      //     this.$notify({
      //       title: "失败",
      //       message: "创建失败",
      //       type: "error",
      //       duration: 4000
      //     });
      //   }
      // });
    },
    //修改数据
    handleUpdata(scope) {
      console.log(scope);
      //this.temp = Object.assign({}, scope.row);
      this.temp = scope.row;
      this.dialogStatus = "update";
      this.dialogbutton = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData() {
      updateCommunity().then(res => {
        console.log(res);
      });
      // updateCommunity(this.temp).then(res => {
      //   if (res.code == "0000") {
      //     for (const v of this.tableData) {
      //       if (v.id === this.temp.id) {
      //         const index = this.tableData.indexOf(v);
      //         this.tableData.splice(index, 1, this.temp);
      //         break;
      //       }
      //     }
      //     //this.tableData.splice(index, 1,this.temp)
      //     this.dialogFormVisible = false;
      //     this.$notify({
      //       title: "成功",
      //       message: "编辑成功",
      //       type: "success",
      //       duration: 2000
      //     });
      //   } else {
      //     this.$notify({
      //       title: "失败",
      //       message: "创建失败",
      //       type: "error",
      //       duration: 4000
      //     });
      //   }
      // });
    },
    //全选
    handleSelectionChange(val) {
      for (var i = 0; i < val.length; i++) {
        this.multipleSelection.push(val[i].id);
      }
      console.log(this.multipleSelection);
    },
    //删除多个
    deleteAll() {
      if (this.multipleSelection) {
        this.$confirm(
          "此操作将删除" + this.multipleSelection.length + "条信息, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            center: true
          }
        )
          .then(() => {
            deleteManyCommunity(this.multipleSelection)
              .then(() => {
                this.multipleSelection = [];
                this.getTable();

                this.$message({
                  type: "success",
                  message: "删除成功"
                });
              })
              .catch(error => {
                this.$message({
                  type: "warning",
                  message: error.data.msg
                });
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消删除"
            });
          });
      }
    },
    //删除单个
    delRow(scope) {
      console.log(scope);
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteCommunity(scope.row.id).then(res => {
            console.log(res);
          });

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
.from-row {
  height: 36px;
}
.from-left-title {
  text-align: right;
  line-height: 36px;
}
.from-value {
}
.from-right {
}
</style>
