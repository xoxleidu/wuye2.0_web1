<template>
  <div>
    <router-view v-if="$route.path!='/manageBusiness/ammeter'"></router-view>
    <div v-if="$route.path=='/manageBusiness/ammeter'">
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
              <el-form-item label="小区">
                <community-select v-model="tableQuery.communityId"></community-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="物产类型">
                <dict-select
                  class="base-select"
                  v-model="tableQuery.estateType"
                  :dict="$dict.ESTATETYPE_MODE"
                ></dict-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="地址">
                <el-input v-model="tableQuery.address" placeholder="地址"></el-input>
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
      <!-- <div class="admin-methdos-btns">
      <el-button @click="openAdd()" size="medium" type="primary" icon="el-icon-plus">新增</el-button>
      </div>-->
      <el-table
        border
        stripe
        size="small"
        :data="tableData.data"
        v-loading="tableLoading"
        style="width: 100%;"
        class="admin-table-list"
      >
        <el-table-column prop="ammeterName" label="电表名"></el-table-column>
        <el-table-column label="激活">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.enable"
              @change="ammeterActivation(scope.row)"
              :active-value="0"
              :inactive-value="1"
              active-text="启用"
              inactive-text="停用"
              active-color="#13ce66"
              inactive-color="#cbcbcb"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <router-link :to="'/manageBusiness/ammeterinfo?ammeterId=' + scope.row.ammeterId + '&ammeterName=' + scope.row.ammeterName + '&enable=' + scope.row.enable">
              <el-button size="mini" icon="el-icon-edit" type="success">查看</el-button>
            </router-link>
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
  </div>
</template>

<script>
import { getAmmeterList, activationAmmeter } from "@/api/estate.js";
import communitySelect from "@/components/select/community-select.vue";
import dictSelect from "@/components/select/dict-select.vue";
export default {
  components: {
    communitySelect,
    dictSelect
  },
  created() {
    // if(this.tableQuery.communityId && this.tableQuery.estateType){
    //   this.getTable();
    // }
  },
  data() {
    return {
      tableLoading: false,
      tableQuery: {
        page: 1,
        size: 10,
        estateType: null,
        communityId: null
      },
      tableData: {
        data: [],
        total: 0
      }
    };
  },
  methods: {
    //激活
    ammeterActivation(row) {
      activationAmmeter(row)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          this.tableLoading = false;
          console.warn(err);
        });
    },
    // 查询信息
    getTable() {
      this.tableLoading = true;
      getAmmeterList(this.tableQuery)
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
      if (this.tableQuery.communityId && this.tableQuery.estateType) {
        this.getTable();
      } else {
        this.$message.error("必须选择小区和物产类型");
      }
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
