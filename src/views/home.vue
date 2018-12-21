<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <div v-for="u in user" :key="u.id" class="user-item">
            <el-row>
              <el-col :span="6" class="user-title">姓名：</el-col>
              <el-col :span="18">
                <el-tag type="success">{{u.name}}</el-tag>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" class="user-title">联系方式：</el-col>
              <el-col :span="18">
                <el-tag type="info">{{u.phone}}</el-tag>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" class="user-title">职位：</el-col>
              <el-col :span="18">
                <el-tag type="warning">{{u.position}}</el-tag>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" class="user-title">所属分组：</el-col>
              <el-col :span="18">
                <el-tag type="danger">{{u.group == 3 ? "办公室" : "管理员"}}</el-tag>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card card1">
          <div class="text item">今日开票数</div>
        </el-card>
        <el-card class="box-card card2">
          <div class="text item">今日已处理缴费数量</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card rili">
          <div class="text item">自己想象一个日历</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top:20px;">
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>常用功能</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>

          <div class="gn-button">
            <el-button v-for="b in buttons" :key="b.id" type="primary">{{"按钮" + b.name}}</el-button>
            <el-button @click="addButton">添加</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { get } from "@/api/index";
export default {
  data() {
    return {
      user: {},
      buttons: [{
        id:1,
        name:"测试1",
        val:"/test"
      },{
        id:2,
        name:"测试2",
        val:"/test"
      }]
    };
  },
  created() {
    
    var userId = this.$store.getters.userId;
    get(userId).then(Response => {
      console.log(Response);
      this.user = Response.data;
    });
    //alert(this.$store.getters.user_id)
  },
  methods: {
    addButton() {
      
    }
  }
};
</script>

<style>

.gn-button button {
  width: 150px;
  height: 150px;
  margin: 20px;
}
.el-card__header {
  background-color: #efefef;
}
.card1 {
  height: 80px;
  background: url(../assets/index01.png) no-repeat top right;
}
.card2 {
  margin-top: 20px;
  height: 80px;
  background: url(../assets/index02.png) no-repeat top right;
}
.rili {
  height: 180px;
}
.user-item div {
  height: 36px;
  line-height: 36px;
  font-size: 12px;
}
.user-title {
  text-align: right;
}
</style>
