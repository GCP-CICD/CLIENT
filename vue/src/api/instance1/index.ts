// 目的：
// 1.傳入自訂的config，更方便去創建多個axios實例（e.g.api1 與 api2 使用的baseURL不同時）
// 2.為每個實例添加個別的攔截器;攔截器的目的通常為接收請求的config，對其修改(e.g.加token)並返回

import _cache from "@/lib/_cache";
import router from "@/router";
import store from "@/store";
import _axios from "../_axios";
import defaultConfig from "../_axios/config";

export default new _axios({
  ...defaultConfig,
  interceptors: {
    reqOnFulfilled(config) {
      const token = _cache.getItem("token", "session") ?? "";
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`; //????
      }
      console.log("個別都有的攔截器:success req");
      return config;
    },
    resOnFulfilled(res) {
      const { code, data, message } = res.data;
      if (code !== "200") {
        console.log(code);
      }
      return data;
    },
    resOnRejected(err) {
      console.log("個別都有的攔截器:error res");

      if (err.response?.status === 401) {
        _cache.clear();
        router.replace({ name: "login" });
        store.dispatch("setMessage", { message: "token無效", type: "warning" });
      }

      return Promise.reject(err);
      throw new Error(err.message);
    },
  },
});

export * from "./login";
export * from "./main";
