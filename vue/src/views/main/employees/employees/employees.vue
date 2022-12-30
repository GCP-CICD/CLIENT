<template>
  <div class="employees">
    <h2>employees</h2>
    <page-search-form :config="config" @handleClickReset="handleClickReset" @handleClickSearch="handleClickSearch"> </page-search-form>
    <!--應該在說未定義 define template click type typescript 但我有definEmits了???? -->

    <page-table ref="pageTableRef" :config="config">
      <template #picture="scope">
        <el-image :src="`/api${scope.row}`" :preview-src-list="[`/api${scope.row}`]" :initial-index="0" />
      </template>
    </page-table>
  </div>
</template>

<script lang="ts" setup>
import { usePageCreate } from "@/hooks/use-page-create";
import { usePageSearch } from "@/hooks/use-page-search";
import pageSearchForm from "@/views/components/page-search-form/page-search-form.vue";
import pageTable from "@/views/components/page-table/page-table.vue";
import config from "./config";

// router.beforeEach  await store.dispatch("main/getPageData", { pageName: "role", query: { limit: 100, offset: 0 } });

const [pageTableRef, handleClickReset, handleClickSearch] = usePageSearch();
const [pageCreatFormRef, handleClickCreate, handleClickEdit] = usePageCreate();
</script>

<style lang="less" scoped>
.form-footer {
  ._flex();
  justify-content: flex-end;
}
</style>
