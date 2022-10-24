import type { App } from "vue";

import { registerElementPlus } from "./registerElementPlus";
import { registerServiceWorker } from "./registerServiceWorker";

export function register(app: App) {
  registerElementPlus(app);
  registerServiceWorker();
}
