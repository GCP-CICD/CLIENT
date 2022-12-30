/* eslint-disable */
declare module "*.vue" {
  // 當在ts中引入.vue文件時，declear他為模塊
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// declare module "element-plus/*";

declare type N = undefined;
