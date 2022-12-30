<template>
  <div class="aside">
    <el-menu :default-active="activeRoute" class="el-menu-vertical-demo" :collapse="isCollapse">
      <template v-for="(v1, i1) in userMenu" :key="i1">
        <template v-if="!v1.children">
          <el-menu-item :index="v1.path" @click="handleMenuItemClick(v1.path)">
            <el-icon><component :is="v1.icon"></component> </el-icon>
            <template #title>
              <span>{{ v1.title }}</span>
            </template>
          </el-menu-item>
        </template>
        <template v-else>
          <el-sub-menu :index="v1.path">
            <template #title>
              <el-icon><component :is="v1.icon"></component> </el-icon>
              <span>{{ v1.title }}</span>
            </template>
            <template v-for="(v2, i2) in v1.children" :key="i2">
              <el-menu-item :index="v2.path" @click="handleMenuItemClick(v2.path)">
                {{ v2.title }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { _useStore } from "@/store";
import { computed, defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  // name: "aside", //[Vue warn]: Do not use built-in or reserved HTML elements as component id: aside
  components: {},
  props: {
    isCollapse: Boolean,
  },
  setup() {
    const store = _useStore();
    const userMenu = computed(() => store.state.login.userMenu);

    const router = useRouter();
    const handleMenuItemClick = (path: any) => {
      router.push({ path });
      // 重置pagenation
      store.dispatch("main/changePageSize", 10);
      store.dispatch("main/changeCurrentPage", 1);
    };
    const route = useRoute();
    const activeRoute = computed(() => route.path);

    return { userMenu, handleMenuItemClick, activeRoute };
  },
});
</script>
<style lang="less" scoped>
.aside {
  .el-menu {
    border-right: none;
  }
  .horizontal-collapse-transition {
    transition: var(--el-transition-duration) width linear;
  }
}
</style>
