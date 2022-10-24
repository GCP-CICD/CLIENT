// 目的：
// 1.傳入自訂的config，更方便去創建多個axios實例（e.g.api1 與 api2 使用的baseURL不同時）
// 2.為每個實例添加個別的攔截器;攔截器的目的通常為接收請求的config，對其修改(e.g.加token)並返回

import _axios from "./_axios";
import defaultConfig from "./_axios/config";

export const api1 = new _axios({
  ...defaultConfig,
  interceptors: {
    reqOnFulfilled(config) {
      const token = "123";
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`; //????
      }
      console.log("個別都有的攔截器:success");
      return config;
    },
    resOnRejected(err) {
      console.log("個別都有的攔截器:error");
      return err;
    },
  },
});
// export const api2 = new _axios(defaultConfig);
