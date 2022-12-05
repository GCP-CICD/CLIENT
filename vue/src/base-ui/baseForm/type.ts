type IType = "input" | "password" | "select" | "datepicker";

export interface IFormItem {
  elType: IType;
  model: string;
  label: string;
  placeholder?: string;
  options?: any[];
  bindOptions?: Record<string, unknown> & { type?: string; placeholder?: string; maxlength?: string };
  rules?: any[] | (() => any[]);
}
export interface IForm {
  formLabelWidth?: string;
  formItem: IFormItem[];
  colLayout?: object;
}
