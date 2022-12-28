<template>
  <div class="header">
    <div>
      <el-icon @click="collapse">
        <template v-if="isCollapse"> <Fold /> </template>
        <template v-else> <Expand /></template>
      </el-icon>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
        <template v-for="(v, i) in breadcrumb" :key="i">
          <el-breadcrumb-item>{{ v }}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
    <user-info />
  </div>
</template>

<script lang="ts">
import { pathToBreadcrumb } from "@/router";
import { _useStore } from "@/store";
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import userInfo from "./components/userInfo.vue";

export default defineComponent({
  components: { userInfo },
  props: {
    isCollapse: Boolean,
  },
  setup(props, { emit }) {
    const store = _useStore();

    //aside收闔
    function collapse() {
      emit("collapse");
    }

    //麵包屑
    const route = useRoute();
    const breadcrumb = computed(() => {
      const userMenu = store.state.login.userMenu;
      const pathname = route.path;
      return pathToBreadcrumb(userMenu, pathname);
    });

    return { collapse, breadcrumb };
  },
});
</script>
<style lang="less" scoped>
.header {
  .init();
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    ._flex();
    .el-icon {
      font-size: 30px;
      line-height: 30px;
      margin-right: 15px;
    }
  }
  i {
    cursor: pointer;
  }
}
</style>
