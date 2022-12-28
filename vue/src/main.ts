import { createApp } from "vue";

import App from "@/App.vue";

import { register } from "@/global/register";

import "@/assets/css/index.less";

import router from "@/router";
import store from "@/store";
import _cache from "./lib/_cache";

(async function () {
  const app = createApp(App);
  app.use(register); // app.ues其中一種用法是會回調裡面的函數並傳入app
  app.use(store);

  if (_cache.getItem("token", "session")) {
    await store.dispatch("handleReload");
  }
  // else {
  //   console.log(console.log(store));

  //   store.replaceState({
  //     message: {
  //       showClose: false,
  //       message: "",
  //       type: "success",
  //     },
  //   });
  // }
  // console.log(store);

  app.use(router);
  app.mount("#app");
})();
