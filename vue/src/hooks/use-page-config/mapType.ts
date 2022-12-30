export default (item: any) => {
  switch (true) {
    case item.COLUMN_NAME === "password":
      return "password";
    case item.DATA_TYPE === "int":
      return "number";

    default:
      return "text";
  }
};
