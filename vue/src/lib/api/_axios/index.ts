/* eslint-disable no-extra-boolean-cast */
import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import type { IInterceptors, IDefultConfig, ILoadingConfig } from "./interface";
import { LoadingInstance } from "element-plus/lib/components/loading/src/loading"; //查看service的返回值是createLoadingComponent其型別為LoadingInstance
import { LoadingOptions } from "element-plus/lib/components/loading/src/types";

import { ElLoading } from "element-plus";

export default class _axios {
  instance: AxiosInstance;
  interceptors?: IInterceptors;
  loading?: LoadingInstance;

  constructor(defaultConfig: IDefultConfig) {
    this.instance = axios.create(defaultConfig); //用create並傳入config產生實例，此舉將使實例包含自定義的baseUrl,timeout...等通用屬性
    this.interceptors = defaultConfig?.interceptors;

    //個別實例的監聽器
    this.instance.interceptors.request.use(this.interceptors?.reqOnFulfilled, this.interceptors?.reqOnRejected);
    this.instance.interceptors.response.use(this.interceptors?.resOnFulfilled, this.interceptors?.resOnRejected);

    //共用的監聽器
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig): AxiosRequestConfig => {
        console.log("全部都有的攔截器:success");
        return config;
      },
      (error: any): any => {
        console.log("全部都有的攔截器:error");
        return error;
      },
    );
    this.instance.interceptors.response.use(
      (result: AxiosResponse): AxiosResponse => {
        return result;
      },
      (error: any): any => {
        return error;
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

  request(config: AxiosRequestConfig, { isLoading = true, ...args }: ILoadingConfig) {
    if (isLoading) this.onLoading(args);
    return this.instance
      .request(config)
      .then((res) => {
        if (isLoading) this.offLoading();

        return res;
      })
      .catch((err) => {
        if (isLoading) this.offLoading();

        return err;
      });
  }
}
