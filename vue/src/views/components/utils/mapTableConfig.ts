import { IConfig } from "./type";

export default function (config: IConfig) {
  const { item } = config;
  const tableItem: Array<any> = [];

  item.forEach((v: any) => {
    tableItem.push({
      ...v,
    });
  });

  return {
    tableItem,
    ...config,
  };
}
