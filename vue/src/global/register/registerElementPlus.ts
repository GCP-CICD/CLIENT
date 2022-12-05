// 1.將element-plus組建直接註冊為全局組件
// 2.引入套件的css

import type { App } from "vue";

import {
  ElButton,
  ElIcon,
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElLink,
  ElForm,
  ElFormItem,
  ElInput,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElFooter,
  ElMenu,
  ElSubMenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElAvatar,
  ElOption,
  ElRadio,
  ElDatePicker,
  ElSelect,
  ElRow,
  ElCol,
  ElTable,
  ElTableColumn,
  ElPagination,
} from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
const components = [
  ElButton,
  ElIcon,
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElLink,
  ElForm,
  ElFormItem,
  ElInput,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElFooter,
  ElMenu,
  ElSubMenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElSelect,
  ElRadio,
  ElOption,
  ElDatePicker,
  ElRow,
  ElCol,
  ElTable,
  ElTableColumn,
  ElPagination,
];

import "element-plus/dist/index.css"; //引入套件全部的css(p.s.也可以按需引入)

export function registerElementPlus(app: App): void {
  // 註冊全局組件
  components.forEach((v) => {
    app.component(v.name, v);
  });
  //註冊全部icons
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
}
