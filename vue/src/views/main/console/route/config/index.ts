import { IConfig } from "@/views/components/utils/type";

const config: IConfig = {
  pageName: "route",
  item: [
    { model: "id", label: "id", columnWidth: "70px" },
    { model: "parentId", label: "parentId" },
    { model: "title", label: "title" },
    { model: "icon", label: "icon" },
    { model: "path", label: "path" },
  ],
  childrenProps: {
    //不太懂
    rowKey: "id",
    treeProp: {
      children: "children",
    },
  },
};

export default config;
