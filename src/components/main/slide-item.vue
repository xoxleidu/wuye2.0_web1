<script>
export default {
  name: "slideItem",
  functional: true,
  render: function(h, context) {
    var route = context.props.route;
    if (route.meta.single) {
      return (
        <el-menu-item index={route.path}>
          <i class={route.meta.icon} />
          {route.meta.name}
        </el-menu-item>
      );
    } else {
      if (route.children) {
        var children = route.children.map(route => {
          return <slide-item route={route} />;
        });
        return (
          <el-submenu index={route.path}>
            <template slot="title">
              <i class={route.meta.icon} />
              {route.meta.name}
            </template>
            {children}
          </el-submenu>
        );
      } else {
        return (
          <el-menu-item index={route.path}>
            <i class={route.meta.icon} />
            {route.meta.name}
          </el-menu-item>
        );
      }
    }
  }
};
</script>
