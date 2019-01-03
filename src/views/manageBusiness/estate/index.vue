<template>
  <div>
    <router-view v-if="$route.path!='/queryinfo/estate'"></router-view>
    <div v-if="$route.path=='/queryinfo/estate'">
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
            <el-col :span="12">
              <el-form-item label="物产类型">
                <dict-select
                  class="base-select"
                  v-model="tableQuery.estateType"
                  :dict="$dict.ESTATETYPE_MODE"
                ></dict-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <community-select class="base-select" v-model="tableQuery.communityId"></community-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="地址">
                <el-input v-model="tableQuery.buildingName" placeholder="地址"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="车位编号/门牌号">
                <el-input v-model="tableQuery.houseNumber" placeholder="地址"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="业主姓名">
                <el-input v-model="tableQuery.owner" placeholder="地址"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
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
      </div> -->
      <el-table
        border
        stripe
        size="small"
        :data="tableData.data"
        v-loading="tableLoading"
        style="width: 100%;"
        class="admin-table-list"
      >
        <el-table-column prop="buildingName" label="地址"></el-table-column>
        <el-table-column prop="owner" label="业主"></el-table-column>
        <el-table-column prop="mobile" label="联系方式"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status==1">空闲</el-tag>
            <el-tag v-if="scope.row.status==2" type="success">出租中</el-tag>
            <el-tag v-if="scope.row.status==3" type="info">已售</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <router-link :to="'/queryinfo/estateInfo?estateId=' + scope.row.estateId">
              <el-button type="success" size="mini" icon="el-icon-edit">查看详情</el-button>
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
import communitySelect from "@/components/select/community-select.vue";
import dictSelect from "@/components/select/dict-select.vue";
import { getEstateList } from "@/api/estate.js";
export default {
  components: { communitySelect, dictSelect },
  created() {
    //this.tableQuery.communityId = this.$route.query.communityId
    this.tableQuery.communityId = Number(this.$route.query.communityId)
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
        buildingName: "",
        estateType: 1,
        communityId: null,
        houseNumber: "",
        license: "",
        owner: "",
        mobile: ""
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

    // 查询信息
    getTable() {
      this.tableLoading = true;
      console.log(this.tableQuery)
      getEstateList(this.tableQuery)
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
