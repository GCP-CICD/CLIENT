<template>
  <div class="table">
    <baseTable v-model:paginationInfo="paginationInfo" v-bind="tableConfig" :table-data="list" @selection-change="handleSelectionChange">
      <template #header>
        <div>list</div>
        <ElButton size="small" plain @click="isCreate = true">new</ElButton>
        <page-create-form v-if="isCreate" :pageName="config.pageName"></page-create-form>
      </template>
      <!-- 常用的欄位寫死在page-table -->
      <template #status="scope">
        <ElButton size="small" plain :type="scope.row === 1 ? 'success' : 'danger'">{{ scope.row === 1 ? "啟用中" : "禁用中" }}</ElButton>
      </template>
      <template #created_at="scope">
        {{ $properties.formatUtc(scope.row) }}
      </template>
      <template #updated_at="scope">
        {{ $properties.formatUtc(scope.row) }}
      </template>

      <!-- 客製的欄位用動態的方式由外部傳入 這邊先將插槽都寫好提供外部引用  與寫死的差別在於 #___為過濾掉寫死之後的customSlot-->
      <template v-for="(v, i) in customSlot" :key="i" #[v.model]="scope">
        <slot :name="v.model" :row="scope.row"></slot>
      </template>

      <!-- 額外的欄位（編輯,刪除...） -->
      <template #extra>
        <el-table-column v-if="1" label="操作" align="center" width="100px">
          <div class="handler-group">
            <ElButton v-if="permissionInfo.edit" size="small" plain type="primary">
              <el-icon>
                <Edit />
              </el-icon>
            </ElButton>
            <ElButton v-if="permissionInfo.delete" size="small" plain type="danger">
              <el-icon>
                <Delete />
              </el-icon>
            </ElButton>
          </div>
        </el-table-column>
      </template>
    </baseTable>
  </div>
</template>
<script lang="ts" setup>
import baseTable from "@/base-ui/baseTable";
import { usePermission } from "@/hooks/use-permission";
import { _useStore } from "@/store";
import pageCreateForm from "@/views/components/page-create-form/page-create-form.vue";
import mapTableConfig from "@/views/components/utils/mapTableConfig";
import { computed, defineProps, PropType, provide, ref, watch } from "vue";
import { IConfig } from "../utils/type";
provide("closeMask", closeMask); // 寫在dispatch下面就報錯????
const props = defineProps({
  config: {
    type: Object as PropType<IConfig>,
    required: true,
  },
});

const store = _useStore();
const permissionInfo = usePermission() as any; //????

const tableConfig = ref(mapTableConfig(props.config));
const customSlot = ref(tableConfig.value.tableItem.filter((v) => v.model !== "status" && v.model !== "created_at" && v.model !== "updated_at"));

const paginationInfo = ref({
  pageSize: 10,
  currentPage: 1,
  total: computed(() => store.getters["main/getCount"]),
});
watch(paginationInfo, () => getData(), { immediate: true });

// 取資料
function getData() {
  store.dispatch(`main/readData`, {
    pageName: props.config.pageName,
    query: { limit: paginationInfo.value.pageSize, offset: (paginationInfo.value.currentPage - 1) * paginationInfo.value.pageSize },
  });
}

const list = computed(() => (store.state as any).main[`${props.config.pageName}`]);

store.dispatch("main/getSchema", props.config.pageName);

// 新建資料
const isCreate = ref(false);
function closeMask() {
  isCreate.value = false;
}

const handleSelectionChange = (value: any[]) => {
  console.log("handleSelectionChange 暫時沒用", value);
};
</script>
<style scoped lang="less">
table {
  .handler-group {
    ._flex();
  }
}
</style>
