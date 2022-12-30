// import { _useStore } from "@/store";

import store from "@/store";

export default (item: any) => {
  // const store = _useStore();
  const roleList = store.getters["main/getPageData"]("role");

  switch (item.COLUMN_NAME) {
    case "role_id":
      return `預設為${roleList.find((v: any) => v.id === +item.COLUMN_DEFAULT)?.name}`;

    default:
      return item.COLUMN_DEFAULT ? `預設為${item.COLUMN_DEFAULT}` : "";
  }
};
