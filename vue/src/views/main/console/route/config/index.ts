import type { IConfig } from "@/hooks/use-page-config/type";

const config: IConfig = {
  pageName: "route",
  itemList: {
    id: {},
    title: {},
    parentId: {},
    path: {},
    icon: {},
    created_at: {},
    updated_at: {},
    deleted_at: {},
  },
  table: {
    selection: true,
    itemList: {
      id: { columnWidth: "70px" },
      title: { columnWidth: "100px" },
      parentId: { isHide: true },
    },
    childrenProps: {
      //不太懂
      rowKey: "id",
      treeProp: {
        children: "children",
      },
    },
  },
  createForm: { itemList: {} },
  editForm: {
    itemList: {},
  },
};

export default config;
