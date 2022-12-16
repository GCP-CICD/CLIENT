export interface ITableItem {
  model: string;
  label: string;
  columnWidth?: string;
}
export interface ITable {
  tableItem: Array<ITableItem>;
  tableSelection: boolean;
  searchFormLabelWidth: string;
}
