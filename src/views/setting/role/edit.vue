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
/*
 *函数定义
 *入口参数data,平行数组
 *key，id字段
 *parentKey，父字段
 *map,需要将原始属性名称转换为什么名称
 */
// function treeUtil(data, key, parentKey, map) {
// 	this.data = data;
// 	this.key = key;
// 	this.parentKey = parentKey;
// 	this.treeParentKey = parentKey; //parentKey要转换成什么属性名称
// 	this.treeKey = key; //key要转换成什么属性名称
// 	this.map = map;
// 	if(map) {
// 		if(map[key]) this.treeKey = map[key];
// 	}
// 	this.toTree = function() {
// 		var data = this.data;
// 		var pos = {};
// 		var tree = [];
// 		var i = 0;
// 		while(data.length != 0) {
// 			if(data[i][this.parentKey] == 0) {
// 				var _temp = this.copy(data[i]);
// 				tree.push(_temp);
// 				pos[data[i][this.key]] = [tree.length - 1];
// 				data.splice(i, 1);
// 				i--;
// 			} else {
// 				var posArr = pos[data[i][this.parentKey]];
// 				if(posArr != undefined) {
// 					var obj = tree[posArr[0]];
// 					for(var j = 1; j < posArr.length; j++) {
// 						obj = obj.children[posArr[j]];
// 					}
// 					var _temp = this.copy(data[i]);
// 					obj.children.push(_temp);
// 					pos[data[i][this.key]] = posArr.concat([obj.children.length - 1]);
// 					data.splice(i, 1);
// 					i--;
// 				}
// 			}
// 			i++;
// 			if(i > data.length - 1) {
// 				i = 0;
// 			}
// 		}
// 		return tree;
// 	}
// 	this.copy = function(item) {
// 		var _temp = {
// 			children: []
// 		};
// 		_temp[this.treeKey] = item[this.key];
// 		for(var _index in item) {
// 			if(_index != this.key && _index != this.parentKey) {
// 				var _property = item[_index];
// 				if((!!this.map) && this.map[_index])
// 					_temp[this.map[_index]] = _property;
// 				else
// 					_temp[_index] = _property;
// 			}
// 		}
// 		return _temp;
// 	}
// }
import { updateUser, getRole } from "@/api/index.js";
export default {
  data() {
    return {
      loading: false,
      postData: {
        roleName: "",
        permission: []
      },
      rules: {
        roleName: [this.$rules.required, this.$rules.length({ min: 6 })]
      },
      checkAll: false,
      checkedCities: [],
      isIndeterminate: true
    };
  },
  props: ["id"],
  created() {
    this.postData.roleId = this.$props.id;
    getRole(this.$props.id).then(res => {
      if (res.data.code == 0) {
        this.reconsData(res.data.data);
        //Object.assign(this.postData, res.data.data);
      }
    });
  },

  methods: {
    reconsData() {
      //this.postData = data;

      var data = [
        {
          id: 1,
          parentId: 0,
          name: "首页"
        },
        {
          id: 2,
          parentId: 1,
          name: "a"
        },
        {
          id: 3,
          parentId: 1,
          name: "b"
        },
        {
          id: 4,
          parentId: 3,
          name: "c"
        },
        {
          id: 5,
          parentId: 4,
          name: "d"
        },
        {
          id: 6,
          parentId: 3,
          name: "e"
        },
        {
          id: 7,
          parentId: 0,
          name: "首页1"
        }
      ];

      var dictX = {};
      var root = [];
      var childrens = data.filter(item => {
        item.children = [];
        dictX[item.id] = item;
        if (item.parentId == 0) {
          root.push(item);
          return false;
        } else {
          return true;
        }
      });
      childrens.map(item => {
        dictX[item.parentId].children.push(item);
      });
      console.log(root);
      this.postData.roleName = "admin11";
      Object.assign(this.postData.permission, root);
      console.log(this.postData.permission);
    },
    handleSubmit() {
      this.$refs["postForm"].validate(valid => {
        if (valid) {
          this.loading = true;
          updateUser(this.postData)
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
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.postData.permission : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    }
  }
};
</script>

<style>
</style>
