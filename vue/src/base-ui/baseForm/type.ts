export type IType = "input" | "password" | "select" | "datepicker";

export interface IFormItem {
  elType?: IType;
  model?: string;
  label?: string;
  placeholder?: string;
  options?: any[];
  bindOptions?: Record<string, unknown> & { type?: string; placeholder?: string; maxlength?: string };
  rules?: any[] | (() => any[]);
}
export interface IForm {
  formLabelWidth?: string;
  itemList: IFormItem[];
  colLayout?: { xs: number; sm: number; md: number; lg: number; xl: number }; // 響應式
}
