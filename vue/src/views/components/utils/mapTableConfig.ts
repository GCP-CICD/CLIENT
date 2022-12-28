import { IConfig } from "./type";

export default function (config: IConfig) {
  const { item } = config;
  const tableItem: Array<any> = [];
  for (const v of item) {
    tableItem.push({
      ...v,
    });
  }
  return {
    tableItem,
    ...config,
  };
}
