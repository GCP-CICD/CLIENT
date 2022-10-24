/* eslint-disable no-extra-boolean-cast */
import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import type { IInterceptors, IDefultConfig, IRequest } from "./interface";
import { LoadingInstance } from "element-plus/lib/components/loading/src/loading";
import { ElLoading } from "element-plus";

export default class _axios {
  instance: AxiosInstance;
  interceptors?: IInterceptors;
  loading?: LoadingInstance; //查看service的返回值是createLoadingComponent其型別為LoadingInstance

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
  onLoading(config?: any) {
    this.loading = ElLoading.service({
      lock: true,
      text: "Loading",
      background: "rgba(0, 0, 0, 0.7)",
    });
  }
  offLoading() {
    setTimeout(() => {
      this.loading?.close();
    }, 500);
  }

  request({ isLoading = true, ...config }: IRequest) {
    if (isLoading) this.onLoading();
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
