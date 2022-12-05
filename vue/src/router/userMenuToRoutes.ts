import type { RouteRecordRaw } from "vue-router";

export const userMenuToRoutes = async (userMenu: any[]) => {
  const routes: RouteRecordRaw[] = []; //資料庫依權限回傳並對應的route
  const allRoutes: RouteRecordRaw[] = []; //所有寫在本地的route
  const filePath = require.context("@/router/main", true, /\.ts/).keys(); //對該路徑內資料夾遍歷 取.ts文件的路徑  true為深度遍歷

  for (const iterator of filePath) {
    const route = await import(`./main${iterator.split(".")[1]}`);
    allRoutes.push(route.default);
  }

  const _recurseGetRoute = (menu: any[]) => {
    for (const iterator of menu) {
      // if (iterator.children) {
      //   _recurseGetRoute(iterator.children);
      // } else {
      //   const route = allRoutes.find((v) => `/${v.path.split("/")[3]}/${v.path.split("/")[4]}` === iterator.path);
      //   if (route) routes.push({ ...route, path: `/${route.path.split("/")[3]}/${route.path.split("/")[4]}` });
      // }

      if (iterator.type === 2) {
        const route = allRoutes.find((v) => `/${v.path.split("/")[2]}/${v.path.split("/")[3]}` === iterator.path);
        if (route) routes.push({ ...route, path: `/${route.path.split("/")[2]}/${route.path.split("/")[3]}` });
      } else {
        _recurseGetRoute(iterator.children);
      }
    }
  };
  _recurseGetRoute(userMenu);

  return routes;
};
