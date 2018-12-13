<template>
  <el-aside width="200px" class="main-slide">
    <a href="/" class="logo">CCCTS_FE</a>
    <el-menu
      :default-active="$route.name"
      router
      background-color="#20222a"
      text-color="rgba(255,255,255,.8)"
    >
      <el-submenu :index="route.name" v-for="route in $router.options.routes" :key="route.name">
        <template slot="title">
          <i class="el-icon-message"></i>
          {{route.meta.name}}
        </template>
        <template v-if="route.children.length">
          <el-menu-item
            :index="subRoute.name"
            v-for="subRoute in route.children"
            :key="subRoute.name"
          >{{subRoute.meta.name}} {{subRoute.name}}</el-menu-item>
        </template>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.main-slide {
  background: #20222a;
  .el-menu {
    border-right: 0;
    .is-active {
      color: $baseColor;
    }
  }
}
.logo {
  color: $baseColor;
  padding: 1.5em;
  display: block;
  text-align: center;
}
</style>