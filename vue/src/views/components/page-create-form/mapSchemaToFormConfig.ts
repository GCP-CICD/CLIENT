import { IForm, IFormItem } from "@/base-ui/baseForm";
import mapRules from "./mapRules";
export default (schema: any) => {
  const formItem: IFormItem[] = [];
  let length = 0;
  for (const item of schema) {
    if (item.COLUMN_NAME.length > length) length = item.COLUMN_NAME.length;
    switch (item.COLUMN_NAME) {
      // 哪些不動作
      case "created_at":
      case "id":
      case "updated_at":
        break;

      // 哪些為select
      case "status":
        formItem.push({
          elType: "select",
          model: item.COLUMN_NAME,
          label: item.COLUMN_NAME,
          rules: mapRules(item),
          options: mapOptions(item),
          bindOptions: {
            // multiple: true,
            placeholder: item.COLUMN_DEFAULT ? `預設為${item.COLUMN_DEFAULT}` : "",
          },
        });
        break;

      default:
        formItem.push({
          elType: item.COLUMN_NAME === "password" ? "password" : "input",
          model: item.COLUMN_NAME,
          label: item.COLUMN_NAME,
          rules: mapRules(item),
          bindOptions: {
            maxlength: item.CHARACTER_MAXIMUM_LENGTH,
            type: mapType(item),
            placeholder: item.COLUMN_DEFAULT ? `預設為${item.COLUMN_DEFAULT}` : "",
          },
        });
        break;
    }
  }
  const config: IForm = { formItem, formLabelWidth: `${length * 10}px` };
  return config;
};

function mapType(item: any) {
  switch (true) {
    case item.COLUMN_NAME === "password":
      return "password";
    case item.DATA_TYPE === "int":
      return "number";

    default:
      return "text";
  }
}
function mapOptions(item: any) {
  switch (item.COLUMN_NAME) {
    case "status":
      return [
        { label: "啟用中", value: "1" },
        { label: "禁用中", value: "2" },
      ];

    default:
      return [{ label: "預設", value: "1" }];
  }
}
