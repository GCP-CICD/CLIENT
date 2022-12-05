<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar size="small"> {{ first_name }} </el-avatar>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="test">Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item disabled>Action 4</el-dropdown-item>
          <el-dropdown-item divided @click="handleClickLogout"> 登出 </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { test1 } from "@/api/instance1/test";
import _cache from "@/lib/_cache";
import { _useStore } from "@/store";
import { computed, defineComponent, inject } from "vue";
import { VueCookies } from "vue-cookies";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "userInfo",
  setup() {
    const store = _useStore();
    const first_name = computed(() => store.state.login.userInfo.first_name).value.slice(0, 1);

    const router = useRouter();
    const handleClickLogout = () => {
      _cache.logout();
      router.push({ name: "login" });
    };

    const $cookies = inject<VueCookies>("$cookies");
    const test = () => {
      // var csrftoken = $cookies?.get("csrfToken");
      // console.log(csrftoken);
      // console.log($cookies?.get("platform"));
      console.log(1);

      test1();
    };

    return { first_name, handleClickLogout, test };
  },
});
</script>
<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;
}
</style>
