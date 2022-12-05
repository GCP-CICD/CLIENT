// (for Composition or Options API) 不能在template
import { debounce, throttle } from "lodash-es";
import type { App, InjectionKey } from "vue";
export interface $lodash {
  throttle: typeof throttle;
  debounce: typeof debounce;
}
export const $lodash: InjectionKey<$lodash> = Symbol("$lodash");

export function registerProvide(app: App): void {
  app.provide("$provide", {
    a() {
      return "pft";
    },
  });
  app.provide($lodash, {
    throttle,
    debounce,
  });
}
