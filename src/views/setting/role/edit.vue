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
          <el-form-item prop="permission" v-for="p in postData" :key="p.id">
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
      postData: {},
      rules: {
        username: [this.$rules.required, this.$rules.length({ min: 6 })]
      }
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
    reconsData(data) {
      console.log(data);
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
    }
  }
};
</script>

<style>
</style>
