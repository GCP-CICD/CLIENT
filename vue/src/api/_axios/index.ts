/* eslint-disable no-extra-boolean-cast */
import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import type { IConfig, ILoadingConfig } from "./type";
import { LoadingInstance } from "element-plus/lib/components/loading/src/loading"; //查看service的返回值是createLoadingComponent其型別為LoadingInstance
import { LoadingOptions } from "element-plus/lib/components/loading/src/types";

import { ElLoading } from "element-plus";

export default class _axios {
  instance: AxiosInstance;
  loading?: LoadingInstance;

  constructor(config: IConfig) {
    this.instance = axios.create(config); //用create並傳入config產生實例，此舉將使實例包含自定義的baseUrl,timeout...等通用屬性

    //個別實例的監聽器
    this.instance.interceptors.request.use(config.interceptors?.reqOnFulfilled, config.interceptors?.reqOnRejected);
    this.instance.interceptors.response.use(config.interceptors?.resOnFulfilled, config.interceptors?.resOnRejected);

    //共用的監聽器
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig): AxiosRequestConfig => {
        console.log("全部都有的攔截器:success req");
        return config;
      },
      (error: any): any => {
        console.log("全部都有的攔截器:error req");
        return error;
      },
    );
    this.instance.interceptors.response.use(
      (result: AxiosResponse): AxiosResponse => {
        console.log("全部都有的攔截器:success res");
        return result;
      },
      (err: any): any => {
        console.log("全部都有的攔截器:error res");
        return Promise.reject(err);
        throw new Error(err.message);
      },
    );
  }
  onLoading(config: LoadingOptions) {
    this.loading = ElLoading.service({
      lock: config.lock || true,
      text: config.text || "Loading",
      background: config.background || "rgba(0, 0, 0, 0.7)",
    });
  }
  offLoading() {
    setTimeout(() => {
      this.loading?.close();
    }, 500);
  }

  request(config: AxiosRequestConfig, { isLoading = true, ...args }: ILoadingConfig = { isLoading: true }): Promise<any> {
    //                                                      1.有預設值所以可以不傳(最右邊)    2.ILoadingConfig定義型別時表示可以不傳isLoading   3.若只有args則isLoading為預設true
    if (isLoading) this.onLoading(args);
    return this.instance
      .request(config)
      .then((res) => {
        if (isLoading) this.offLoading();
        return res; //直接return res就好，不要動這裡
      })
      .catch((err) => {
        if (isLoading) this.offLoading();
        return Promise.reject(err);
        throw new Error(err.message);
      });
  }
}
