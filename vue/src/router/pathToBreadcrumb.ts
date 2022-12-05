function match(userMenu: any[], breadcrumb: any[], pathname: string): any {
  for (const iterator of userMenu) {
    if (iterator.type === 1) {
      const matchingPath = match(iterator.children ?? [], breadcrumb, pathname);
      if (matchingPath) {
        breadcrumb.push(iterator.title);

        return matchingPath; //找到就return 提前中斷
      }
    } else if (iterator.path === pathname) {
      breadcrumb.push(iterator.title);

      return iterator;
    }
  }
}

export const pathToBreadcrumb = (userMenu: any[], pathname: string): any => {
  const breadcrumb: any[] = [];
  match(userMenu, breadcrumb, pathname);
  return breadcrumb.reverse();
};
