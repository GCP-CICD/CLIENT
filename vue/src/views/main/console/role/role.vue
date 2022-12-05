<template>
  <div class="role">
    <h2>role</h2>

    <page-search-form :config="config"> </page-search-form>
    <page-table :config="config"></page-table>
  </div>
</template>

<script lang="ts">
import pageSearchForm from "@/views/components/page-search-form/index.vue";
import pageTable from "@/views/components/page-table/page-table.vue";
import { defineComponent } from "vue";
import config from "./config";

export default defineComponent({
  name: "role",
  components: { pageSearchForm, pageTable },
  setup() {
    return { config };
  },
});
</script>

<style lang="less" scoped>
.form-footer {
  ._flex();
  justify-content: flex-end;
}
</style>
