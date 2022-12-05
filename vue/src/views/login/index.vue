<template>
  <div class="login">
    <h1>Management system</h1>
    <section>
      <panel></panel>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import panel from "./components/panel.vue";

export default defineComponent({
  name: "login",
  components: { panel },
  setup() {
    return {};
  },
});
</script>
<style lang="less" scoped>
.login {
  .init();
  ._flex();
  flex-direction: column;
}
</style>
