import { useRoute } from "vue-router";

export function usePermission() {
  const route = useRoute();

  return route.meta.permissionInfo;
}
