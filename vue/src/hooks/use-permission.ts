import { useRoute, useRouter } from "vue-router";

export function usePermission() {
  // const store = _useStore();
  // const permissions = store.state.login.permissions;
  // const verifyPermission = `system:${pageName}:${hanldeName}`;
  // // name = "coderwhy"
  // // !name -> false
  // // !!name -> true
  // return !!permissions.find((item) => item === verifyPermission);
  const route = useRoute();
  const router = useRouter();

  console.log(route);
  console.log(router);

  return route.meta.permissionInfo;
}
