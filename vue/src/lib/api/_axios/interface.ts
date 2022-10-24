import type { AxiosResponse, AxiosRequestConfig } from "axios";
import { LoadingOptions } from "element-plus/lib/components/loading/src/types";

export interface IInterceptors {
  reqOnFulfilled: (config: AxiosRequestConfig) => AxiosRequestConfig;
  reqOnRejected?: (error: any) => any;
  resOnFulfilled?: (result: AxiosResponse) => AxiosResponse;
  resOnRejected?: (error: any) => any;
}

export interface IDefultConfig extends AxiosRequestConfig {
  interceptors: IInterceptors;
}

export interface ILoadingConfig extends LoadingOptions {
  isLoading?: boolean;
}
