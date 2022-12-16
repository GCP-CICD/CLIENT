import instance from "@/api/instance1";
import type { IGetRoute, ILogin } from "./type";

export const emailLogin = (payload: ILogin) => {
  return instance.request({ method: "post", url: "/login", data: payload });
};

export const getRoute = (payload: IGetRoute) => {
  return instance.request({ method: "get", url: "/route", params: { role_id: payload } });
};
export const checkToken = () => {
  return instance.request({ method: "get", url: "/checkToken" });
};
