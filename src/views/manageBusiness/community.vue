<template>
  <div>
    <router-view v-if="$route.path!='/manageBusiness/community'"></router-view>
    <el-container class="estate-cont" v-if="$route.path=='/manageBusiness/community'">
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
                <span :class="[data.id >= maxexpandId ? 'slot-t-node--label' : '']">{{ node.label }}</span>
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
      <el-main class="estate-cont-main">
        <el-header class="el-view-header">
          <community-select v-on:communitySelect="community($event)"></community-select>
        </el-header>
        <el-main>
          <office-select v-on:officeSelect="office($event)"></office-select>
          <router-link :to="'/manageBusiness/estate?conmmunityId=' + testId">{{testId}}</router-link>
        </el-main>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { getOfficeTree } from "@/api/estate";
import communitySelect from "@/components/select/community-select.vue";
import officeSelect from "@/components/select/office-select.vue";
export default {
  name: "slot-tree",
  components: { communitySelect, officeSelect },
  data() {
    return {
      maxexpandId: 95, //api.maxexpandId,//新增节点开始id
      non_maxexpandId: 95, //api.maxexpandId,//新增节点开始id(不更改)
      isLoadingTree: true, //是否加载节点树
      setTree: [], //节点树数据
      iconSize: "mini",
      defaultProps: {
        children: "children",
        label: "label"
      },
      testId: 13
    };
  },
  created() {
    getOfficeTree().then(res => {
      this.setTree = res.data.data;
    });
  },
  methods: {
    //小区搜索
    community(msg) {
      console.log(msg);
    },

    handleNodeClick(data) {
      console.log(data);
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
      console.log(n, d);
      if (n.editable) {
        this.$set(n, "editable", false);
        this.$set(n.data, "label", d.name);
      }
    },
    // nodeEdit(s, d, n) {
    //   //编辑
    //   d.editable = true;
    //   this.$nextTick(() => {
    //     this.$refs["treeInput" + d.id].$refs.input.focus();
    //   });
    //   this.$emit("nodeEdit", s, d, n);
    // },
    NodeEdit(n, d) {
      //编辑节点
      console.log(n, d);
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
      console.log(n, d);
      //let that = this;
      if (d.children && d.children.length !== 0) {
        this.$message.error("此节点有子级，不可删除！");
        return false;
      } else {
        //新增节点可直接删除，已存在的节点要二次确认
        //删除操作
        let DelFun = () => {
          let _list = n.parent.data.children || n.parent.data; //节点同级数据
          let _index = _list.map(c => c.id).indexOf(d.id);
          console.log(_index);
          _list.splice(_index, 1);
          this.$message.success("删除成功！");
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
      console.log(n, d);
      //判断层级
      if (n.level >= 3) {
        this.$message.error("最多只支持三级！");
        return false;
      }
      //新增数据
      d.children.push({
        id: ++this.maxexpandId,
        label: "新增节点",
        pid: d.id,
        children: []
      });
      //同时展开节点
      if (!n.expanded) {
        n.expanded = true;
      }
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
  font-weight: 600;
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
  padding-top: 4px;
  padding-left: 3px;
}

.slot-tree .el-tree-node__content:hover .slot-t-icons {
  display: inline-block;
}
</style>
