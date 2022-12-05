import type { App } from "vue";

import VueCookies from "vue-cookies";
import { registerElementPlus } from "./registerElementPlus";
import { registerProperties } from "./registerProperties";
import { registerProvide } from "./registerProvide";
import { registerServiceWorker } from "./registerServiceWorker";

export function register(app: App) {
  registerElementPlus(app);
  registerServiceWorker();
  registerProperties(app);
  registerProvide(app);
  app.use(VueCookies, { expires: "7d" });
}
