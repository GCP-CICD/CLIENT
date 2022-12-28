export interface IEditFormValue {
  id: number;
  [key: string]: any;
}
export interface IProps {
  pageName: string | undefined;
  editFormValue: IEditFormValue | undefined;
}
