export default (item: any, pageName: string, isEdit: boolean) => {
  switch (pageName) {
    case "employees":
      switch (item.COLUMN_NAME) {
        case "password":
          return isEdit ? true : false; //不能在該畫面改密碼
        default:
          break;
      }
      break;

    default:
      break;
  }
  return false;
};
