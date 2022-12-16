import instance from "@/api/instance1";

export const getSchema = (pageName: string) => {
  return instance.request({ method: "get", url: "/schema", data: {}, params: { pageName } });
};
export const createData = (url: string, data: any) => {
  return instance.request({ method: "post", url, data });
};
export const readData = (url: string, params: any) => {
  return instance.request({ method: "get", url, data: {}, params });
};
export const updateData = (url: string, data: any) => {
  return instance.request({ method: "put", url, data });
};
export const deleteData = (url: string, data: any) => {
  return instance.request({ method: "delete", url, data });
};
