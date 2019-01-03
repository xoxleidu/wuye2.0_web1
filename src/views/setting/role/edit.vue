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
          <dl v-for="(permissionList,index) in permissionDict" :key="index" class="permission-list">
            <dt>
              {{permissionList.name}}
              <el-checkbox
                :indeterminate="permissionList.checked.length > 0 &&   permissionList.checked.length != permissionList.allPermission.length"
                v-model="permissionList.checkAll"
                @change="(isChecked)=>{handleCheckAllChange(isChecked,permissionList)}"
              >全选</el-checkbox>
            </dt>
            <dd>
              <el-checkbox-group
                v-model="permissionList.checked"
                @change="handleCheckedChange(permissionList)"
              >
                <div
                  class="permission-group"
                  v-for="permissionGroup in permissionList.children"
                  :key="permissionGroup.permissionId"
                >
                  <strong class="permission-item-name">{{permissionGroup.menuName}}</strong>
                  <div class="permission-item">
                    <el-checkbox
                      :label="permission.permissionId"
                      v-for="permission in permissionGroup.children"
                      :key="permission.permissionId"
                    >{{permission.menuName}}</el-checkbox>
                  </div>
                </div>
              </el-checkbox-group>
            </dd>
          </dl>
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
import { updateRole, getRole, getPermission } from "@/api/index.js";
export default {
  data() {
    return {
      loading: false,
      postData: {
        roleName:""
      },
      permissionDict: [
        {
          name: "首页",
          childrenIds: [1], //下级id集合
          children: [], //下级
          checked: [], //已选
          allPermission: [], //所有可选权限，用于对比全选状态
          checkAll: false //是否全选
        },
        {
          name: "信息查询",
          childrenIds: [4],
          children: [],
          checked: [],
          allPermission: [],
          checkAll: false
        },
        {
          name: "费用办理",
          childrenIds: [7],
          children: [],
          checked: [],
          allPermission: [],
          checkAll: false
        },
        {
          name: "数据查询",
          childrenIds: [11, 15, 19, 26, 29, 33, 36],
          children: [],
          checked: [],
          allPermission: [],
          checkAll: false
        },
        {
          name: "业务管理",
          childrenIds: [39, 44, 48, 52, 56, 60, 64],
          children: [],
          checked: [],
          allPermission: [],
          checkAll: false
        },
        {
          name: "系统管理",
          childrenIds: [67, 69, 71, 74],
          children: [],
          checked: [],
          allPermission: [],
          checkAll: false
        },
        {
          name: "其他",
          childrenIds: [76, 78],
          children: [],
          checked: [],
          allPermission: [],
          checkAll: false
        }
      ],
      rules: {
        roleId: [this.$rules.required],
        roleName: [this.$rules.required, this.$rules.length({ min: 6 })]
      }
    };
  },
  props: ["id"],
  created() {
    this.postData.roleId = this.$props.id;
    getPermission().then(res => {
      if (res.data.code == 0) {
        var data = res.data.data;
        var parentsDict = {};
        var childrens = data.filter(item => {
          if (item.parentId == 0) {
            item.children = [];
            item.childrenIds = []; //存放所有id，放到方便一级
            parentsDict[item.permissionId] = item;
            return false;
          } else {
            return true;
          }
        });
        childrens.map(item => {
          parentsDict[item.parentId].children.push(item);
          parentsDict[item.parentId].childrenIds.push(item.permissionId);
        });
        this.permissionDict.map(item => {
          item.childrenIds.map(id => {
            item.children.push(parentsDict[id]);
            item.allPermission = item.allPermission.concat(
              parentsDict[id].childrenIds
            );
          });
        });
        this.getRole();
      } else {
        this.$message.error(res.data.msg);
      }
    });
  },
  methods: {
    getRole() {
      //获取角色信息 ["2", "3", "20", "40"]
      getRole({
        roleId: this.$props.id
      }).then(res => {
        if (res.data.code == 0) {
          this.postData.roleName = res.data.data.roleName;
          var hasPermission = res.data.data.permissionIds;
          hasPermission.map(item => {
            //item = item.toString();
            //console.log(this.permissionDict)
            this.permissionDict.map(permissionList => {
              if (permissionList.allPermission.includes(item)) {
                permissionList.checked.push(item);
              }
            });
            
          });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    handleCheckAllChange(isChecked, permissionList) {
      if (isChecked) {
        this.$set(permissionList, "checked", permissionList.allPermission);
      } else {
        this.$set(permissionList, "checked", []);
      }
    },
    handleCheckedChange(permissionList) {
      if (
        permissionList.checked.length == permissionList.allPermission.length
      ) {
        permissionList.checkAll = true;
      } else {
        permissionList.checkAll = false;
      }
    },
    handleSubmit() {
      this.$refs["postForm"].validate(valid => {
        if (valid) {
          this.loading = true;
          this.postData.permissionIds = [];
          this.permissionDict.map(item => {
            this.postData.permissionIds = this.postData.permissionIds.concat(
              item.checked
            );
          });
          updateRole(this.postData)
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

<style lang="scss">
.permission-list {
  dl,
  dd,
  dt {
    margin: 0;
    padding: 0;
  }
  dt {
    font-size: 1.2em;
    font-weight: bold;
  }
  .permission-group {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    width: 100%;
    line-height: 35px;
    margin-bottom: -1px;
    background: #fff;
  }
  .permission-item-name {
    display: block;
    font-weight: normal;
    text-align: center;

    width: 150px;
    flex-shrink: 0;
  }
  .permission-item {
    border-left: 1px solid #ddd;

    label {
      width: 160px;
      margin-left: 0 !important;
      padding-left: 20px;
    }
  }
  .el-checkbox-group {
    font-size: inherit;
    display: block;
  }
}
</style>
