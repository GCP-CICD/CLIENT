<template>
  <div class="dashboard" @click="a">dashboard</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { _useStore } from "@/store";
export default defineComponent({
  components: {},
  setup() {
    const store = _useStore();

    function a() {
      store.dispatch("setMessage", { message: 123 });
    }
    return { a };
  },
});
</script>

<style scoped lang="less"></style>
