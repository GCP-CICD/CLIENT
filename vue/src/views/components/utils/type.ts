import { IFormItem } from "@/base-ui/baseForm";
import { ITableItem } from "@/base-ui/baseTable";

export interface IConfig {
  pageName?: string;
  item: Array<IFormItem | ITableItem>; //好像不能用IFormItem，因為type是mapping定義的????
  tableSelection?: boolean;
  searchFormLabelWidth?: string;
}
