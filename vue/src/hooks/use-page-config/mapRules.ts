export default (item: any, pageType: string) => {
  const rules = [
    // 解放這行可測試validator
    // {
    //   required: true,
    //   validator(rule: any, value: any, callback: any) {
    //     console.log(rule);
    //     console.log(value);
    //     console.log(callback);
    //   },
    //   trigger: "change",
    // },
  ];
  switch (true) {
    case item.IS_NULLABLE === "NO" && !item.COLUMN_DEFAULT && pageType !== "searchForm":
      rules.push({ required: true, message: "Please input", trigger: "blur" });
      break;

    default:
      break;
  }
  switch (item.COLUMN_NAME) {
    case "email_address":
      rules.push({ type: "email", message: "must be a email", trigger: "change" });
      break;

    default:
      break;
  }
  switch (item.DATA_TYPE) {
    case "int":
      rules.push({ type: "number", message: "must be a number", trigger: "change" });
      break;

    default:
      break;
  }
  return rules;
};
