module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended", //prettier的設定會覆蓋前面的
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/no-explicit-any": "off", //可以用any
    "@typescript-eslint/no-non-null-assertion": "off", //非空判斷
    "@typescript-eslint/no-extra-boolean-cast": "off", //雙驚嘆號
    "newline-per-chained-call": "off", //????垃圾東西,
    "vue/multi-word-component-names": 0, //home.vue
    "no-undef": "off", //tsconfig已經檢查了//https://stackoverflow.com/questions/67437478/why-eslint-dont-see-global-typescript-types-in-vue-files-no-undef
  },
  // overrides: [
  //   {
  //     files: ["*.ts", "*.vue"],
  //     rules: {},
  //   },
  // ],
};
