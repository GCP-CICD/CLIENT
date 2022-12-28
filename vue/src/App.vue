<template>
  <!-- https://element-plus.org/en-US/guide/i18n.html#configprovider -->
  <div class="App">
    <el-config-provider :locale="locale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { ElConfigProvider, ElMessage } from "element-plus";
import { computed, inject, watch } from "vue"; //defineComponent函數： 從js角度看無意義，在ts中定義返回類型為type defineComponent 還可以為內部傳入的參數做類型判斷
import { $lodash } from "./global/register/registerProvide"; //key為Symbol形式，所以另外引入進來
import { _useStore } from "./store";

const store = _useStore();
const message = computed(() => store.state.message);
const lodash = inject($lodash);

watch(
  message,
  lodash!.debounce(
    () => {
      ElMessage({
        showClose: message.value.showClose,
        message: message.value.message,
        type: message.value.type,
      });
    },
    1000,
    // { leading: true },
  ),
);
</script>

<style lang="less" scoped>
.App {
  .init();
}
</style>

<script lang="ts">
export default {
  name: "App",
  inheritAttrs: false,
  customOptions: {},
};
</script>
