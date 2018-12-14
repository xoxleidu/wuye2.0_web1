<template>
  <div style="width:50%">
    <el-form ref="form" :model="formData" label-width="80px">
      <el-row :gutter="20">
        <el-col>
          <el-form-item label="名称">
            <el-input size="small" style="width:50%" v-model="formData.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="区域">
            <el-select
              size="small"
              style="width:50%"
              v-model="formData.region"
              placeholder="请选择活动区域"
            >
              <el-option label="区域一" value="1"></el-option>
              <el-option label="区域二" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="时间">
            <el-date-picker
              size="small"
              style="width:50%"
              v-model="formData.time"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="活动性质">
            <el-checkbox-group v-model="formData.type">
              <el-checkbox label="餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="特殊资源">
            <el-radio-group v-model="formData.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
              <el-radio label="单纯品牌曝光"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="即时配送">
            <el-switch v-model="formData.delivery"></el-switch>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="活动形式">
            <el-input style="width:50%" type="textarea" v-model="formData.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: "",
        region: "",
        delivery: "",
        type: "",
        resource: "",
        desc: "",
        time: []
      }
    };
  },
  methods: {
    onSubmit() {
      console.log(this.formData);
    }
  }
};
</script>

<style>
</style>
