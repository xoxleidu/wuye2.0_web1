<template>
  <div>
    <router-view v-if="$route.path!='/manageBusiness/community'"></router-view>
    <div v-if="$route.path=='/manageBusiness/community'">
      <el-container class="estate-cont">
        <el-aside class="estate-cont-aside">
          <div class="slot-tree">
            <!-- <el-button class="slot-t-top" type="primary" size="small" @click="handleAddTop">添加顶级节点</el-button> -->
            <el-tree
              ref="SlotMenuList"
              class="expand-tree"
              v-if="isLoadingTree"
              node-key="id"
              highlight-current
              :data="setTree"
              :props="defaultProps"
              :expand-on-click-node="false"
              @node-click="handleNodeClick"
            >
              <span class="slot-t-node" slot-scope="{ node, data }">
                <!-- 未编辑状态 -->
                <span v-show="!node.editable">
                  <span
                    :class="[data.id >= maxexpandId ? 'slot-t-node--label' : '']"
                  >{{ node.label }}</span>
                  <span class="slot-t-icons">
                    <!-- 新增按钮 -->
                    <el-button
                      icon="el-icon-plus"
                      circle
                      :size="iconSize"
                      type="success"
                      @click="NodeAdd(node, data)"
                    ></el-button>
                    <!-- 编辑按钮 -->
                    <el-button
                      icon="el-icon-edit"
                      circle
                      :size="iconSize"
                      type="primary"
                      @click="NodeEdit(node, data)"
                    ></el-button>
                    <!-- 删除按钮 -->
                    <el-button
                      icon="el-icon-delete"
                      circle
                      :size="iconSize"
                      type="warning"
                      @click="NodeDel(node, data)"
                    ></el-button>
                  </span>
                </span>
                <!-- 编辑输入框 -->
                <span v-show="node.editable">
                  <el-input
                    class="slot-t-input"
                    size="mini"
                    autofocus
                    v-model="data.name"
                    :ref="'slotTreeInput'+data.id"
                    @blur.stop="NodeBlur(node, data)"
                    @keyup.enter.native="NodeBlur(node, data)"
                  ></el-input>
                </span>
              </span>
            </el-tree>
          </div>
        </el-aside>
        <!-- table -->
        <!-- table -->
        <!-- table -->
        <el-main class="estate-cont-main">
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
                  <el-form-item label="小区名">
                    <el-input v-model="tableQuery.communityName" placeholder="小区名"></el-input>
                  </el-form-item>
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
            <el-table-column prop="communityName" label="小区名"></el-table-column>
            <el-table-column prop="officeName" label="所属办公室"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <router-link :to="'/manageBusiness/estate?communityId=' + scope.row.communityId">
                  <el-button type="warning" size="mini" icon="el-icon-edit">设置</el-button>
                </router-link>&nbsp;
                <el-button
                  size="mini"
                  @click="openEdit(scope)"
                  icon="el-icon-edit"
                  type="success"
                >编辑</el-button>
                <el-button size="mini" @click="delRow(scope)" icon="el-icon-edit" type="danger">删除</el-button>
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
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import {
  getOfficeTree,
  getCommunityList,
  deleteCommunity,
  addOffice,
  updateOffice,
  deleteOffice
} from "@/api/estate.js";
import add from "./add.vue";
import edit from "./edit.vue";
export default {
  components: { add, edit },
  created() {
    getOfficeTree().then(res => {
      this.setTree = res.data.data;
    });
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
        communityName: "",
        communityId: null
      },
      tableData: {
        data: [],
        total: 0
      },
      //tree
      maxexpandId: 95, //api.maxexpandId,//新增节点开始id
      non_maxexpandId: 95, //api.maxexpandId,//新增节点开始id(不更改)
      isLoadingTree: true, //是否加载节点树
      setTree: [], //节点树数据
      iconSize: "mini",
      defaultProps: {
        children: "children",
        label: "label"
      },
      postData: {
        communityId: null,
        officeId: null,
        officeName: ""
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
      this.editId = scope.row.communityId;
      this.editDialog = true;
    },
    //修改密码
    openRepassword(scope) {
      this.addKey++;
      this.editId = scope.row.communityId;
      this.repasswordDialog = true;
    },
    // 查询信息
    getTable() {
      this.tableLoading = true;
      getCommunityList(this.tableQuery)
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
      this.tableQuery.communityId = null;
      //Object.assign(this.$data, this.$options.data())
      this.getTable();
    },
    //删除行
    delRow(scope) {
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteCommunity(scope.row.communityId)
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            })
            .catch(err => {
              this.$message({
                type: "info",
                message: err.msg
              });
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
    },

    /**
     * tree
     */

    handleNodeClick(data) {
      this.tableQuery.communityId = data.value;
      this.getTable();
    },

    // handleAddTop() {
    //   //添加顶级节点
    //   this.setTree.push({
    //     id: ++this.maxexpandId,
    //     label: "新增顶级节点",
    //     pid: "",
    //     children: []
    //   });
    // },
    //树形结构
    NodeBlur(n, d) {
      //输入框失焦
      if (n.editable) {
        this.postData = {
          officeId: d.id,
          officeName: d.name,
        };
        updateOffice(this.postData)
          .then(res => {
            if (res.data.code == 0) {
              this.$set(n, "editable", false);
              this.$set(n.data, "label", d.name);
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            console.warn(err);
          });
      }
    },
    // nodeEdit(s, d, n) {
    //   console.log("编辑1")
    //   //编辑
    //   d.editable = true;
    //   this.$nextTick(() => {
    //     this.$refs["treeInput" + d.id].$refs.input.focus();
    //   });
    //   this.$emit("nodeEdit", s, d, n);
    // },
    NodeEdit(n, d) {
      //编辑节点
      if (!n.editable) {
        //检测isEdit是否存在or是否为false
        this.$set(n, "editable", true);
      }
      this.$nextTick(() => {
        this.$refs["slotTreeInput" + d.id].$refs.input.focus();
      });
    },
    NodeDel(n, d) {
      //删除节点ssss
      //console.log(n, d);
      //let that = this;
      if (d.children && d.children.length !== 0) {
        this.$message.error("此节点有子级，不可删除！");
        return false;
      } else {
        //新增节点可直接删除，已存在的节点要二次确认
        //删除操作
        let DelFun = () => {
          deleteOffice(d.value)
            .then(res => {
              if (res.data.code == 0) {
                let _list = n.parent.data.children || n.parent.data; //节点同级数据
                let _index = _list.map(c => c.id).indexOf(d.id);
                _list.splice(_index, 1);
                this.$message.success("删除成功！");
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => {
              console.warn(err);
            });
        };
        //二次确认
        let ConfirmFun = () => {
          this.$confirm("是否删除此节点？", "提示", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              DelFun();
            })
            .catch(() => {});
        };
        //判断是否是新增节点
        d.id > this.non_maxexpandId ? DelFun() : ConfirmFun();
      }
    },
    NodeAdd(n, d) {
      //新增节点
      //判断层级
      if (n.level >= 3) {
        this.$message.error("最多只支持三级！");
        return false;
      }
      //新增数据 "新增办公室" + Math.ceil(Math.random()*1000)
      this.postData = {
        //officeId: ++this.maxexpandId,
        officeName: "新增办公室",
        parentId: d.id
      };
      addOffice(this.postData)
        .then(res => {
          //var labelName = "新增节点" + Math.ceil(Math.random()*1000);
          if (res.data.code == 0) {
            var result = res.data.data;
            d.children.push({
              id: result.officeId,
              label: "新增办公室",
              pid: d.id,
              children: []
            });
            //同时展开节点
            if (!n.expanded) {
              n.expanded = true;
            }
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.warn(err);
        });
    }
  }
};
</script>

<style>
.estate-cont {
  height: 100%;
  padding: 20px;
  border: #efefef 1px solid;
}
.estate-cont-aside {
  border-right: #efefef 1px solid;
  width: 100px;
}
.el-view-header {
  background-color: #f8f8f8;
  color: #555;
  line-height: 60px;
}

.slot-tree {
  width: 96%;
  height: 80%;
  margin: 0 auto;
  padding: 0px;
  max-width: 300px;
  overflow-y: auto;
}
/*顶部按钮*/
.slot-tree .slot-t-top {
  margin-bottom: 15px;
}
.slot-tree .slot-t-node {
}
.slot-tree .slot-t-node span {
  display: inline-block;
}
/*节点*/
.slot-tree .slot-t-node--label {
  /* font-weight: 600; */
}
/*输入框*/
.slot-tree .slot-t-input .el-input__inner {
  height: 26px;
  line-height: 26px;
}
/*按钮列表*/
.slot-tree .slot-t-node .slot-t-icons {
  display: none;
  margin-left: 10px;
}
.slot-tree .slot-t-icons .el-button {
  margin-left: 6px;
  width: 20px;
  height: 20px;
  padding-top: 3px;
  padding-left: 2px;
}

.slot-tree .el-tree-node__content:hover .slot-t-icons {
  display: inline-block;
}
</style>
