import { IFormItem } from "@/base-ui/baseForm";
import { IConfig } from "./type";

export default function (config: IConfig) {
  const { item, searchFormLabelWidth } = config;
  const searchFormItem: Array<IFormItem> = [];

  item.forEach((v) => {
    switch (v.model) {
      case "created_at":
      case "updated_at":
        searchFormItem.push({
          ...v,
          elType: "datepicker",
          bindOptions: {
            type: "daterange",
            ["unlink-panels"]: true,
            ["start-placeholder"]: "Start date",
            ["end-placeholder"]: "End date",
            ["range-separator"]: "To",
            shortcuts: [
              {
                text: "Last week",
                value: () => {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  return [start, end];
                },
              },
              {
                text: "Last month",
                value: () => {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  return [start, end];
                },
              },
              {
                text: "Last 3 months",
                value: () => {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                  return [start, end];
                },
              },
            ],
          },
        });
        break;

      case "status":
        searchFormItem.push({
          ...v,
          elType: "select",
          options: [
            { label: "啟用中", value: "1" },
            { label: "禁用中", value: "2" },
          ],
          bindOptions: {
            // multiple: true,
          },
        });
        break;

      case "id":
        break;

      default:
        searchFormItem.push({
          ...v,
          elType: "input",
        });
        break;
    }
  });

  return {
    formItem: searchFormItem,
    formLabelWidth: searchFormLabelWidth,
  };
}
