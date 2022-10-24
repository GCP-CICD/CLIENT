import type { AxiosResponse, CreateAxiosDefaults, AxiosRequestConfig } from "axios";

export interface IInterceptors {
  reqOnFulfilled: (config: AxiosRequestConfig) => AxiosRequestConfig;
  reqOnRejected?: (error: any) => any;
  resOnFulfilled?: (result: AxiosResponse) => AxiosResponse;
  resOnRejected?: (error: any) => any;
}

export interface IDefultConfig extends AxiosRequestConfig {
  interceptors: IInterceptors;
}
export interface IRequest extends AxiosRequestConfig {
  isLoading?: boolean;
}
