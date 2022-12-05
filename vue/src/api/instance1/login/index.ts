import instance from "@/api/instance1";
import type { ILogin, IGetRoute } from "./type";

export const emailLogin = (payload: ILogin) => {
  return instance.request({ method: "post", url: "/login", data: payload });
};

export const getRoute = (payload: IGetRoute) => {
  return instance.request({ method: "get", url: "/getRoute2", params: { id: payload } });
};
export const checkToken = () => {
  return instance.request({ method: "get", url: "/checkToken" });
};
