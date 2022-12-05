import type { AxiosResponse, AxiosRequestConfig, AxiosError } from "axios";
import { LoadingOptions } from "element-plus/lib/components/loading/src/types";

export interface IConfig extends AxiosRequestConfig {
  interceptors?: IInterceptors;
}
export interface IInterceptors {
  reqOnFulfilled: (config: AxiosRequestConfig) => AxiosRequestConfig;
  reqOnRejected?: (error: any) => any;
  resOnFulfilled?: (result: AxiosResponse) => AxiosResponse;
  resOnRejected?: (error: AxiosError) => any;
}

export interface ILoadingConfig extends LoadingOptions {
  isLoading?: boolean;
}
