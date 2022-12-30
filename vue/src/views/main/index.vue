<template>
  <div class="main">
    <el-container>
      <el-aside :width="isCollapse ? '60px' : '200px'">
        <myAside :isCollapse="isCollapse"></myAside>
      </el-aside>
      <el-container>
        <el-header>
          <myHeader @collapse="collapse" :isCollapse="isCollapse"></myHeader>
        </el-header>
        <el-main>
          <div class="router-view">
            <router-view></router-view>
          </div>
        </el-main>
        <!-- <el-footer>
            <myFooter></myFooter>
          </el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import myAside from "./components/aside/aside.vue";
import myHeader from "./components/header/header.vue";
// import myFooter from "./footer/index.vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  components: {
    myHeader,
    myAside,
    // myFooter
  },
  setup() {
    const isCollapse = ref(false);
    const collapse = () => {
      isCollapse.value = !isCollapse.value;
    };
    return { isCollapse, collapse };
  },
});
</script>
<style lang="less" scoped>
.main {
  .init();
  > .el-container {
    .init();
  }
}
.el-header {
  border-bottom: 1px solid #ddd;
}
.el-aside {
  border-right: 1px solid #ddd;
  transition: width 0.3s linear;
  overflow-x: hidden;
}
.el-footer {
  border-top: 1px solid #ddd;
}
.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
  .router-view {
    background-color: white;
  }
}
</style>
