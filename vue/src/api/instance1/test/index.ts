import instance from "@/api/instance1";

export const test1 = () => {
  return instance.request({ method: "post", url: "/user", data: { name: "jason22", age: 20 } });
};
