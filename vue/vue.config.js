const { defineConfig } = require("@vue/cli-service");
const { version } = require("./package.json");
// const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack(config) {
    //
  },
  pages: {
    index: {
      // entry for the page
      entry: "src/main",
      // the source template
      template: "public/index.html",
      // output as dist/index.html
      filename: "index.html",
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: version,
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
  },

  devServer: {
    host: "0.0.0.0", //https://blog.csdn.net/weixin_59237016/article/details/124067586   解决vue问题WebSocketClient.js?5586:16 WebSocket connection to ‘ws://x.x.x.60:8081/ws‘ failed
    historyApiFallback: true, //設為false可模擬SSR(server side render) 當頁面刷新時server返回對應資源，若url沒有就404
    proxy: {
      //需求以代理的形式發出，對瀏覽器來說，即為同源
      "^/api": {
        target: "http://localhost:7001",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
        onProxyRes(proxyRes, req, res) {
          console.log("req.hesders.cookie :", req.headers.cookie);
        },
      },
      "^/foo": {
        target: "<other_url>",
      },
    },
  },
  css: {
    loaderOptions: {
      // 向所有 Sass 樣式傳入共享的全局變量
      // scss: {
      //   prependData: `@import "@/assets/css/variable.scss";
      // `,
      less: {
        additionalData: `@import "@/assets/css/variable.less";
      `,

        // @import "@/assets/layout/style.scss";
        // prependData: assetsVariablePath,
      },
    },
  },
});
