// import { _useStore } from "@/store";
import store from "@/store";

export default (item: any) => {
  // const store = _useStore();
  const roleList = store.getters["main/getPageData"]("role");
  switch (item.COLUMN_NAME) {
    case "role_id":
      return roleList.map((v: any) => ({ label: v.name, value: v.id }));
    case "status":
      return [
        { label: "啟用中", value: 1 },
        { label: "禁用中", value: 2 },
      ];

    default:
      return [{ label: "預設", value: "1" }];
  }
};
