<template>
  <div>
    <el-row class="el-row-left">
      <el-col :span="2" v-if="moreSelect" class="deleteAllButton">
        <el-button type="danger" @click="toggleSelection(multipleSelection)">删除选中项</el-button>
      </el-col>
      <el-col :span="2" v-if="moreSelect" class="deleteAllButton">
        <el-button @click="toggleSelection()">取消选择</el-button>
      </el-col>
      <el-col :span="6">
        <el-input
          placeholder="请输入内容"
          v-model="inputSearch"
          @keyup.enter.native="onSubmitSearch"
          class="input-with-select"
        >
          <el-select v-model="selectSearch" slot="prepend" placeholder="请选择" style="width: 100px;">
            <el-option label="用户名" value="0"></el-option>
          </el-select>
        </el-input>
      </el-col>
      <el-col :span="1">
        <el-button type="success" icon="el-icon-search" @click="onSubmitSearch"></el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="onSubmitAdd">添加用户</el-button>
      </el-col>

      <el-col :span="2">
        <el-button type="primary" @click="onSubmitClear">刷新</el-button>
      </el-col>
    </el-row>
    <el-table
      v-loading="listLoading"
      element-loading-text="Loading"
      ref="multipleTable"
      :data="tableData"
      stripe
      border
      :default-sort="{order: 'descending'}"
      @selection-change="handleSelectionChange"
      style="width: 98%;margin: 20px;"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" sortable width="60"></el-table-column>
      <el-table-column prop="name" label="昵称" width="90"></el-table-column>
      <el-table-column align="center" prop="userName" label="用户名" width="160"></el-table-column>
      <el-table-column prop="passWord" label="密码" width="120"></el-table-column>
      <el-table-column prop="group" label="分组" width="110"></el-table-column>
      <el-table-column align="center" label="激活" width="110">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            @change="userActivation(scope.row)"
            :active-value="0"
            :inactive-value="1"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[5, 10, 15, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!--双击弹出层-->
    <!-- <el-dialog :visible.sync="dialogImgVisible">
      <el-form ref="imgForm" :rules="rules" :model="temp"
               label-position="left" label-width="70px"
               style="width: 700px; margin:auto; text-align: center;">
        <el-row class="dialogtempimgcard">
          <p>车辆登记编号: {{ temp.registrationNumber }}</p>
          <p>登记日期: {{ temp.recordDate }} | 座位数: {{ temp.seating }} | 油耗: {{ temp.fuelConsumption }}</p>
          <p>车辆识别码: {{ temp.vehicleIdentification }} | 发动机号: {{ temp.engineNumber }}</p>
          <p>厂牌号: {{ temp.brandCachet }}</p>
          <p>车身长: {{ temp.busLength }} | 车身宽: {{ temp.busWide }} | 车身高: {{ temp.busHigh }}</p>
          <p>车标记: {{ temp.airConditioned == 1 ? "空调车":"非空调车"}}</p>
          <p>备注: {{ temp.busNote }}</p>
        </el-row>
      </el-form>
    </el-dialog>-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 800px; margin-left:20px;"
      >
        <el-row :gutter="16" class="form_data_label">基本信息</el-row>
        <el-row :gutter="16">
          <el-col :span="2">身份证</el-col>
          <el-col :span="5">
            <el-input v-model="temp.card"/>
          </el-col>
          <el-col :span="2">姓名</el-col>
          <el-col :span="4">
            <el-input v-model="temp.name"/>
          </el-col>
          <el-col :span="3">职位</el-col>
          <el-col :span="4">
            <el-input v-model="temp.position"/>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :span="2">用户名</el-col>
          <el-col :span="5">
            <el-input v-model="temp.userName" :disabled="dialogStatus==='create'? false : true"/>
          </el-col>
          <el-col :span="2">密码</el-col>
          <el-col :span="4">
            <el-input v-model="temp.passWord" :disabled="dialogStatus==='create'? false : true"/>
          </el-col>
          <el-col :span="3">联系方式</el-col>
          <el-col :span="6">
            <el-input v-model="temp.phone"/>
          </el-col>
        </el-row>

        <el-row :gutter="16">
          <el-col :span="2">状态</el-col>
          <el-col :span="2">
            <el-switch
              v-model="temp.state"
              @change="userActivation(temp.row)"
              :active-value="0"
              :inactive-value="1"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </el-col>
          <el-col :span="3">所属分组</el-col>
          <el-col :span="4">
            <el-select v-model="temp.group" placeholder="请选择分组">
              <el-option label="管理员" value="0"/>
              <el-option label="高层" value="1"/>
              <el-option label="财务" value="2"/>
              <el-option label="员工" value="3"/>
            </el-select>
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
</template>

<script>
import {
  getUser,
  addUser,
  updateUser,
  deleteUser,
  deleteManyUser,
  activationUser
} from "@/api/index";

export default {
  name: "user",
  data() {
    return {
      moreSelect: false,
      inputSearch: undefined,
      selectSearch: undefined,
      switchTrue: true,
      switchFalse: false,
      dialogbutton: "",
      /*{

          id: 1,
          name: "",//昵称
          userName: "",//用户名
          passWord: "",//密码
          state: 0,//状态
          group: 0,//分组

        }*/

      listLoading: true,
      tableData: [
        {
          id: 1,
          name: "", //昵称
          userName: "", //用户名
          passWord: "", //密码
          state: 0, //状态
          group: 0 //分组
        }
      ],
      multipleSelection: [],
      total: 5,
      currentPage: undefined,
      pageSize: 5,

      temp: {
        id: undefined,
        name: "", //昵称
        userName: "", //用户名
        passWord: "", //密码
        state: 0, //状态
        group: 0, //分组
        phone: "", //..电话
        card: "", //..身份证
        position: "" //职位
      },
      dialogStatus: "",
      dialogFormVisible: false,
      dialogImgVisible: false,
      textMap: {
        update: "Edit",
        create: "Create"
      },
      querykey: "busLicense"
    };
  },
  created: function() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData();
  },
  methods: {
    //重置数据
    resetTemp() {
      this.temp = {
        id: undefined,
        name: "", //昵称
        userName: "", //用户名
        passWord: "", //密码
        state: 0, //状态
        group: 0, //分组
        phone: "", //..电话
        card: "", //..身份证
        position: "" //职位
      };
    },

    //用户激活
    userActivation(row) {
      activationUser(row).then(res => {
        console.log(res);
      });
    },

    //添加用户
    onSubmitAdd() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogbutton = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },

    //   dbClickRow(val) {
    //     /*this.temp.licensePath = val.licensePath;
    //     this.temp.healthPath = val.healthPath;*/
    //     this.dialogImgVisible = true
    //     this.$nextTick(() => {
    //       this.$refs['imgForm'].clearValidate()
    //     })
    //   },

    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.fetchData();
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.fetchData();
    },

    //批量删除
    toggleSelection(rows) {
      if (rows) {
        if (rows.length > 0) {
          this.$confirm(
            "此操作将删除" + rows.length + "条信息, 是否继续?",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
              center: true
            }
          ).then(() => {
              deleteManyUser(rows)
                .then(res => {
                  this.multipleSelection = [];
                  this.moreSelect = false;
                  this.fetchData();

                  this.$message({
                    type: "success",
                    message: res.msg
                  });
                })
                .catch(error => {
                  this.$message({
                    type: "warning",
                    message: error.msg
                  });
                });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "取消删除"
              });
            });
        } else {
          this.multipleSelection = [];
        }
      } else {
        this.$refs.multipleTable.clearSelection();
        this.moreSelect = false;
      }
    },
    //全选初始化
    handleSelectionChange(val) {
      this.moreSelect = true;
      this.multipleSelection = [];
      for (var v in val) {
        this.multipleSelection.push(val[v].id);
      }

      //this.multipleSelection = val;
      //this.fetchData();
      // console.log(`当前页: ${val}`);
    },

    callbackFunction(result) {
      alert(result + "aaa");
    },

    //查询
    onSubmitSearch() {
      if (this.selectSearch == undefined) {
        this.$notify({
          title: "警告",
          message: "请选择查询条件",
          type: "warning",
          duration: 2000
        });
      } else if (this.inputSearch == undefined) {
        this.$notify({
          title: "警告",
          message: "请填写查询内容",
          type: "warning",
          duration: 2000
        });
      } else {
        this.fetchData();
      }
    },

    //刷新
    onSubmitClear() {
      this.currentPage = undefined;
      this.selectSearch = undefined;
      this.inputSearch = undefined;
      this.fetchData();
    },

    //初始化TABLE数据
    fetchData() {
      this.listLoading = true;
      var sData = {
        currentPage: 1
      };
      //getUser(this.currentPage, this.pageSize,this.selectSearch,this.inputSearch)
      getUser(sData).then(response => {
        //debugger
        console.log(response);
        this.listLoading = false;
        //   this.total = response.data.total;
        //   this.currentPage = response.data.current;
        this.tableData = response.data.records;
      });
    },
    //添加数据
    createData() {
      console.log(this.temp);
      addUser(this.temp).then(res => {
        if (res.code == "000") {
          this.temp.id = res.result;
          this.tableData.unshift(this.temp);
          this.dialogFormVisible = false;
          this.$notify({
            title: "成功",
            message: "创建成功",
            type: "success",
            duration: 2000
          });
        } else {
          this.$notify({
            title: "失败",
            message: "创建失败",
            type: "error",
            duration: 4000
          });
        }
      });
    },
    //初始化更新
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      //this.temp.timestamp = new Date(this.temp.timestamp)
      /*this.imageFaceUrl = row.photoPath;
        this.imageCardUrl = row.licensePath;
        this.imageMedicalUrl = row.healthPath;*/
      this.dialogbutton = "update";
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    //更新数据
    updateData() {
      console.log(this.temp);
      updateUser(this.temp).then(res => {
        if (res.code == "000") {
          for (const v of this.tableData) {
            if (v.id === this.temp.id) {
              const index = this.tableData.indexOf(v);
              this.tableData.splice(index, 1, this.temp);
              break;
            }
          }
          //this.tableData.splice(index, 1,this.temp)
          this.dialogFormVisible = false;
          this.$notify({
            title: "成功",
            message: "编辑成功",
            type: "success",
            duration: 2000
          });
        } else {
          this.$notify({
            title: "失败",
            message: "创建失败",
            type: "error",
            duration: 4000
          });
        }
      });
    },
    //删除单个
    handleDelete(row) {
      deleteUser(row.id).then(res => {
        if (res.code == "000") {
          const index = this.tableData.indexOf(row);
          this.tableData.splice(index, 1);
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 2000
          });
        } else {
          this.$notify({
            title: "失败",
            message: "创建失败",
            type: "error",
            duration: 4000
          });
        }
      });

      const index = this.list.indexOf(row);
      this.list.splice(index, 1);
    }

    /*handleAvatarSuccess(res, file) {
        //this.imageUrl = URL.createObjectURL(file.raw);
        this.imageFaceUrl = res.result.url;
        this.temp.photoPath = res.result.url;
      },
      handleAvatarSuccess1(res, file) {

        console.log(res)
        //this.imageUrl = URL.createObjectURL(file.raw);
        this.imageCardUrl = res.result.url;
        this.temp.licensePath = res.result.url
      },
      handleAvatarSuccess2(res, file) {

        console.log(res)
        //this.imageUrl = URL.createObjectURL(file.raw);
        this.imageMedicalUrl = res.result.url;
        this.temp.healthPath = res.result.url
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },*/
  }
};
</script>

<style scoped>
.form_data_label {
  font-size: 14px;
  font-weight: bold;
  padding-bottom: 10px;
  border-bottom: 1px solid #d3dce6;
}
.el-row {
  margin: 20px;
}
.el-col {
  line-height: 36px;
}
.el-row-left {
  margin-left: 20px;
  margin-top: 20px;
  margin-right: 20px;
}

.el-select .el-input {
  width: 130px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.input-with-select select {
  width: 120px;
}
.deleteAllButton {
  margin: 0px;
  padding: 0px;
  width: 120px;
}
</style>
