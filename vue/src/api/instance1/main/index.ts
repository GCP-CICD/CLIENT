import instance from "@/api/instance1";

export const getPageSchema = (pageName: string) => {
  return instance.request({ method: "get", url: "/schema", data: {}, params: { pageName } });
};
export const createPageData = (url: string, data: any) => {
  return instance.request({ method: "post", url, data });
};
export const getPageData = (url: string, params: any) => {
  return instance.request({ method: "get", url, params });
  // return instance.request({ method: "post", url, data: { ...params } });
};
export const editPageData = (url: string, data: any) => {
  return instance.request({ method: "put", url, data });
};
export const deletePageData = (url: string) => {
  return instance.request({ method: "delete", url });
};
