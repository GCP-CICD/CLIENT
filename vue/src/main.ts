import { createApp } from "vue";

import App from "@/App.vue";
const app = createApp(App);

import { register } from "@/lib/register";
app.use(register); // app.ues其中一種用法是會回調裡面的函數並傳入app

import router from "@/router";
import store from "@/store";
app.use(store).use(router);

app.mount("#app");
