<template>
  <el-aside width="200px" class="main-slide">
    <a href="/" class="logo">CCCTS_FE</a>
    <el-menu
      :default-active="$route.path"
      router
      background-color="#20222a"
      text-color="rgba(255,255,255,.8)"
    >
      <div v-for="route in routes" :key="route.path">
        <slide-item :route="route"></slide-item>
        <!-- <el-menu-item :index="route.path" v-if="route.meta.single">
          <i :class="route.meta.icon"></i>
          {{route.meta.name}}
        </el-menu-item>
        <el-submenu :index="route.path" v-if="!route.meta.single">
          <template slot="title" v-if="!route.meta.single">
            <i :class="route.meta.icon"></i>
            {{route.meta.name}}
          </template>
          <template v-if="route.children && route.children.length && !route.meta.single">
            <el-menu-item
              :index="subRoute.path"
              v-for="subRoute in route.children"
              :key="subRoute.name"
            >{{subRoute.meta.name}}</el-menu-item>
          </template>
        </el-submenu>-->
      </div>
    </el-menu>
  </el-aside>
</template>
<script>
import slideItem from "./slide-item";
export default {
  components: { slideItem },
  computed: {
    routes: function() {
      return this.$router.options.routes.filter(item => {
        return !item.meta.hidden;
      });
    }
  }
};
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