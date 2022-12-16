<template>
  <div class="route">
    <h2>route</h2>
    <page-table :config="config"></page-table>
  </div>
</template>

<script lang="ts">
import pageTable from "@/views/components/page-table/page-table.vue";
import { defineComponent } from "vue";
import config from "./config";

export default defineComponent({
  name: "route",
  components: { pageTable },
  setup() {
    return { config };
  },
});
</script>

<style lang="less" scoped></style>
