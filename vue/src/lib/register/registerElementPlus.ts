// 1.將element-plus組建直接註冊為全局組件
// 2.引入套件的css

import type { App } from "vue";

import { ElButton, ElLoading } from "element-plus";
const components = [ElButton];

import "element-plus/dist/index.css"; //引入套件全部的css(p.s.也可以按需引入)

export function registerElementPlus(app: App): void {
  components.forEach((v) => {
    app.component(v.name, v); // 註冊為全局組件
  });
}
