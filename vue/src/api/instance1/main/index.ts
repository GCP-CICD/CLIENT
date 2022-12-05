import instance from "@/api/instance1";

export const getPageListData = (url: string, params: any) => {
  return instance.request({ method: "get", url, data: {}, params });
};
export const getSchema = (pageName: string) => {
  return instance.request({ method: "get", url: "/schema", data: {}, params: { pageName } });
};
export const create = (url: string, data: any) => {
  return instance.request({ method: "post", url, data });
};
