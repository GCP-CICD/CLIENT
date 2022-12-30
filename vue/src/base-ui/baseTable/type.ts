export interface ITableItem {
  model?: string;
  label?: string;
  columnWidth?: string;
  bindOptions?: any;
}
export type IDefaultSort = {
  prop: string;
  order: "ascending" | "descending";
};
export type IChildrenProps = {
  //不太懂
  rowKey: string;
  treeProp: {
    children: string;
  };
};
export interface ITable {
  itemList: Array<ITableItem>;
  selection?: boolean;
  childrenProps?: IChildrenProps;
  defaultSort?: IDefaultSort;
}
