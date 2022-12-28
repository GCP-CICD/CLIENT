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
    <!-- <page-create-form ref="pageCreatFormRef" :pageName="config.pageName" :editFormValue="{ id: 1 }"></page-create-form> -->
  </div>
</template>

<script lang="ts" setup>
import { usePageCreate } from "@/hooks/use-page-create";
import { usePageSearch } from "@/hooks/use-page-search";
// import pageCreateForm from "@/views/components/page-create-form/page-create-form.vue";
import pageSearchForm from "@/views/components/page-search-form/page-search-form.vue";
import pageTable from "@/views/components/page-table/page-table.vue";
import config from "./config";

const [pageTableRef, handleClickReset, handleClickSearch] = usePageSearch();
const [pageCreatFormRef, handleClickCreate, handleClickEdit] = usePageCreate();
</script>

<style lang="less" scoped>
.form-footer {
  ._flex();
  justify-content: flex-end;
}
</style>
