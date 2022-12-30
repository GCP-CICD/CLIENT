/* eslint-disable no-case-declarations */
import { IForm } from "@/base-ui/baseForm";
import { ITable } from "@/base-ui/baseTable";
import { _useStore } from "@/store";
import { ref, watch } from "vue";
import mapBindOptions from "./mapBindOptions";
import mapELType from "./mapELType";
import mapOptions from "./mapOptions";
import mapRules from "./mapRules";
import { IFormItemConfig, ITableItemConfig } from "./type";
export interface IMapInfo {
  pageType: "createForm" | "editForm" | "searchForm" | "table";
  pageConfig?: any;
  itemList: any;
}

export default ({ pageType, pageConfig, itemList: customItemList }: IMapInfo) => {
  const config = ref<IForm | ITable>({
    // const config = ref<IForm | ITable>({
    ...pageConfig,
    itemList: [],
  });

  const store = _useStore();

  watch(
    () => store.getters["main/getPageSchema"],
    (inSchema, o) => watchFn(inSchema),
    // { immediate: true },// 進畫面就call會導致schema未回傳就更新，造成錯誤
  );
  function watchFn(inSchema: any) {
    //用customItemList排序
    const outSchema = [];
    for (const [customKey, customItem] of Object.entries(customItemList)) {
      const schemaItem = inSchema.find((schemaItem: any) => schemaItem.COLUMN_NAME === customKey);
      outSchema.push({ ...(customItem as any), ...schemaItem });
    }

    config.value = changeFormConfig(inSchema, outSchema);
  }

  return {
    config,
    watchFn: () => watchFn(store.getters["main/getPageSchema"]),
  }; // 因未immediate，create表單並不會監聽到變化，所以要另外執行一次

  function changeFormConfig(inSchema: Array<any>, outSchema: Array<any>) {
    const itemList: Array<IFormItemConfig | ITableItemConfig> = [];

    let length = 0;

    if (inSchema.length > 0) {
      for (const item of outSchema) {
        const rules = mapRules(item, pageType);
        const options = mapOptions(item);
        const bindOptions = mapBindOptions(item);
        const elType = mapELType(item);
        const customItemConfig = pageConfig?.itemList?.[item.COLUMN_NAME];
        switch (pageType) {
          case "createForm":
          case "editForm":
            if (item.COLUMN_NAME.length > length) length = item.COLUMN_NAME.length;
            switch (item.COLUMN_NAME) {
              //1.先區分哪些不動作(config則是客製化隱藏)
              case "id":
              case "created_at":
              case "updated_at":
              case "deleted_at":
                break;
              default:
                itemList.push({
                  ...customItemConfig,
                  elType: elType,
                  model: item.COLUMN_NAME,
                  label: item.COLUMN_NAME,
                  rules: rules,
                  options: options,
                  bindOptions: { ...bindOptions, ...customItemConfig?.bindOptions },
                  isHide: customItemConfig?.isHide ?? false,
                });
                break;
            }
            break;

          case "searchForm":
            if (item.COLUMN_NAME.length > length) length = item.COLUMN_NAME.length;
            switch (item.COLUMN_NAME) {
              case "id":
              case "deleted_at":
                break;
              default:
                itemList.push({
                  ...customItemConfig,
                  elType: elType,
                  model: item.COLUMN_NAME,
                  label: item.COLUMN_NAME,
                  rules: rules,
                  options: options,
                  bindOptions: { ...bindOptions, ...customItemConfig?.bindOptions },
                  isHide: customItemConfig?.isHide ?? false,
                });
                break;
            }

            break;

          case "table":
            switch (item.COLUMN_NAME) {
              default:
                itemList.push({
                  ...customItemConfig,
                  model: customItemConfig?.model ?? item.COLUMN_NAME,
                  label: customItemConfig?.label ?? item.COLUMN_NAME,
                  columnWidth: customItemConfig?.columnWidth ?? `${item.COLUMN_NAME.length * 15}px`,
                  bindOptions: { ...bindOptions, ...customItemConfig?.bindOptions },
                });
                break;
            }

            break;
          default:
            break;
        }
      }
    }

    return {
      ...config.value,
      itemList: itemList.filter((v) => !v.isHide),
      formLabelWidth: (config as { value: IForm }).value.formLabelWidth ?? `${length * 10}px`, //config沒給的話就取COLUMN_NAME最大長度
    };
  }
};
