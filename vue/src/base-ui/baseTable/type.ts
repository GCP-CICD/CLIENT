export interface ITableItem {
  model: string;
  label: string;
  tableWidth?: string;
}
export interface ITable {
  tableItem: Array<ITableItem>;
  tableSelection: boolean;
  searchFormLabelWidth: string;
}
