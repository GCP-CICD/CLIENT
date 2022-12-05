import { ILoginState } from "./login/type";
import { IMainState } from "./main/type";

import type { messageType } from "element-plus";

export interface IRootState {
  message: { showClose: boolean; message: string; type: messageType };
}
export interface IMessage {
  showClose?: boolean;
  message: string;
  type?: messageType;
}

export interface IRootWithModule {
  login: ILoginState;
  main: IMainState;
}
export type IStore = IRootState & IRootWithModule;
