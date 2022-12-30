import { IForm, IFormItem } from "@/base-ui/baseForm";
import { ITable, ITableItem } from "@/base-ui/baseTable";

interface IIsHide {
  isHide?: boolean;
}

export interface IFormItemConfig {
  [key: string]: IFormItem & IIsHide;
}
export interface ITableItemConfig {
  [key: string]: ITableItem & IIsHide; //可以吧ITableItem裡的問號拿掉嗎????
}
interface IFormConfig extends Omit<IForm, "itemList"> {
  itemList: IFormItemConfig;
}
interface ITableConfig extends Omit<ITable, "itemList"> {
  itemList: ITableItemConfig;
}

export interface IConfig {
  pageName: string;
  itemList: any;
  table: ITableConfig;
  searchForm?: IFormConfig;
  createForm?: IFormConfig;
  editForm?: IFormConfig;
}
