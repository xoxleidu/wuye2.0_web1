<template>
  <el-container class="main-container">
    <slide-menu class="main-slide-menu"></slide-menu>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span @click="loginOut">退出</span>
      </el-header>

      <el-main class="main-slide">
        <div class="main-slide-item">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item
              :to="{path:route.path}"
              v-for="route in breadcurmb"
              :key="route.path"
            >{{route.meta.name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="main-view" v-bind:style="{height: myHeight}">
        <router-view></router-view></div>
      </el-main>
    </el-container>
  </el-container>
</template>
<style>
html,
body,
.main-container {
  height: 100%;
}
.el-header {
  background-color: #20222a;
  color: #FFF;
  line-height: 60px;
}
.main-slide {
  background-color: #f8f8f8;
}
.main-view {
  background-color: #FFF;
  padding: 20px;
  margin-top: 20px;
  -webkit-box-shadow:inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 10px rgba(220, 220, 220, .4);
  box-shadow:inset 0px 1px 1px rgba(0,0,0,0.075), 0px 0px 8px rgba(220,220,220,0.4);
}
.main-slide-item {
  background-color: #FFF;
  padding: 20px;
  -webkit-box-shadow:inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 10px rgba(220, 220, 220, .4);
  box-shadow:inset 0px 1px 1px rgba(0,0,0,0.075), 0px 0px 10px rgba(220,220,220,0.4);
}
</style>

<script>
import slideMenu from "./slide-menu";
export default {
  data(){
    return {
      myHeight: (window.innerHeight - 220) + 'px'
    }
  },
  computed: {
    breadcurmb: function() {
      return this.$route.matched.filter(item => {
        return item.meta.name && !item.meta.hidden;
      });
    }
  },
  created() {
    console.log(this.$router);
  },
  components: { slideMenu },
  methods: {
    loginOut() {
      this.$store.dispatch("loginOut").then(() => {
        this.$router.replace({ name: "login" });
      });
    }
  }
};
</script>