<template>
  <div class="role">
    <h2>role</h2>
    <page-search-form :config="config" @handleClickReset="handleClickReset" @handleClickSearch="handleClickSearch"> </page-search-form>

    <page-table ref="pageTableRef" :config="config"></page-table>
  </div>
</template>

<script lang="ts">
import { usePageSearch } from "@/hooks/use-page-search";
import pageSearchForm from "@/views/components/page-search-form/page-search-form.vue";
import pageTable from "@/views/components/page-table/page-table.vue";
import { defineComponent } from "vue";
import config from "./config";

export default defineComponent({
  name: "role",
  components: { pageSearchForm, pageTable },
  setup() {
    const [pageTableRef, handleClickReset, handleClickSearch] = usePageSearch();

    return { config, pageTableRef, handleClickReset, handleClickSearch };
  },
});
</script>

<style lang="less" scoped>
.form-footer {
  ._flex();
  justify-content: flex-end;
}
</style>
