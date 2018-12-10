module.exports = {
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        //导入全局scss变量
        data: `@import "@/style/variables.scss";`
      }
    }
  }
};
