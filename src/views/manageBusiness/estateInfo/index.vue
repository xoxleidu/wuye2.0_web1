<template>
  <div>
    <el-form>
      <el-card>
        <el-row :gutter="0" v-for="(ownerInfo, index) in ownerInfo" :key="index">
          <el-col :span="8">
            <el-form-item label="业主">{{ownerInfo.owner}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证">{{ownerInfo.idcard}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系方式">{{ownerInfo.mobile}}</el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <br>
      <el-tabs type="border-card" v-model="editableTabsValue" @tab-click="handleClick">
        <el-tab-pane
          :key="index"
          v-for="(item, index) in editableTabs"
          :label="item.title"
          :name="item.title"
        >
          <div v-if="index == 0">111</div>
          <div v-if="index == 1">222</div>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editableTabsValue: "Tab 1",
      ownerInfo: [
        {
          id: 1,
          owner: "11",
          mobile: "321321321",
          idcard: "12312312131",
          remark: "fsdfsdfs"
        }
      ],
      editableTabs: [
        {
          title: "Tab 1"
        },
        {
          title: "Tab 2"
        }
      ],
      tabIndex: 1
    };
  },
  methods: {
    handleClick(tab) {
      //handleClick(tab, e)
      console.log(tab);
      //点击选项卡
      //var _val = tab.index; //
      //this.getWaterDetails(_val);
    },
    getWaterDetails(val) {
      //tab0
      if (val == 0) {
        console.log(val);
      }
    }
  }
};
</script>
