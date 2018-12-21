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

      <el-main>
        <div>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item
              :to="{path:route.path}"
              v-for="route in breadcurmb"
              :key="route.path"
            >{{route.meta.name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <router-view></router-view>
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
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
</style>

<script>
import slideMenu from "./slide-menu";
export default {
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