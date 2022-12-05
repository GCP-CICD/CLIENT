// globalProperties 可以在template option api 使用 不能在setup用(可以用下面的方法 https://learnku.com/vuejs/t/61860)
import { formatUtc } from "@/lib/formatTime";
import { throttle } from "lodash-es";
import type { App } from "vue";

declare module "vue" {
  interface ComponentCustomProperties {
    $properties: any;
  }
}
export function registerProperties(app: App): void {
  app.config.globalProperties.$properties = {
    formatUtc(utcTime: string) {
      return formatUtc(utcTime);
    },
  };
  app.config.globalProperties.$lodash = {
    throttle,
  };
}

// import { getCurrentInstance } from "@vue/runtime-core";
// const {
//   appContext: {
//     config: {
//       globalProperties: { $properties },// 解構把$properties拿出來放到setup裡面用
//     },
//   },
// } = getCurrentInstance()!;
