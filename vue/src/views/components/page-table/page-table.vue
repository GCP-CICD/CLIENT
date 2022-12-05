<template>
  <div class="table">
    <baseTable v-model:paginationInfo="paginationInfo" v-bind="tableConfig" :table-data="list" @selection-change="handleSelectionChange">
      <template #header>
        <div>list</div>
        <ElButton size="small" plain @click="isCreate = true">new</ElButton>
        <page-create-form v-if="isCreate" :pageName="config.pageName"></page-create-form>
      </template>
      <template #status="scope">
        <ElButton size="small" plain :type="scope.row === 1 ? 'success' : 'danger'">{{ scope.row === 1 ? "啟用中" : "禁用中" }}</ElButton>
      </template>
      <template #created_at="scope">
        {{ $properties.formatUtc(scope.row) }}
      </template>
      <template #updated_at="scope">
        {{ $properties.formatUtc(scope.row) }}
      </template>
    </baseTable>
  </div>
</template>
<script lang="ts" setup>
import baseTable from "@/base-ui/baseTable";
import { _useStore } from "@/store";
import pageCreateForm from "@/views/components/page-create-form/page-create-form.vue";
import mapTableConfig from "@/views/components/utils/mapTableConfig";
import { computed, defineProps, PropType, provide, ref } from "vue";
import { IConfig } from "../utils/type";
provide("closeMask", closeMask); // 寫在dispatch下面就報錯????
const props = defineProps({
  config: {
    type: Object as PropType<IConfig>,
    required: true,
  },
});

const tableConfig = ref(mapTableConfig(props.config));

const paginationInfo = ref({
  limit: 10,
  offset: 0,
});

// 取資料
const store = _useStore();
store.dispatch(`main/getPageList`, { pageName: props.config.pageName, query: { ...paginationInfo.value } });
const list = computed(() => (store.state as any).main[`${props.config.pageName}`]);

store.dispatch("main/getSchema", props.config.pageName);

// 新建資料
const isCreate = ref(false);
function closeMask() {
  isCreate.value = false;
}

const handleSelectionChange = (value: any[]) => {
  console.log("handleSelectionChange");
  console.log(value);
};
</script>
<style scoped lang="less">
table {
}
</style>
