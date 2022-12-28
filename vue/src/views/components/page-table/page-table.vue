<template>
  <div class="table">
    <baseTable v-model:paginationInfo="paginationInfo" v-bind="tableConfig" :table-data="list" @selection-change="() => {}">
      <template #header>
        <div>list</div>
        <ElButton v-if="permissionInfo.edit" size="small" plain @click="handleClickCreate">create</ElButton>
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

      <!-- 客製的欄位用動態的方式由外部傳入 這邊先將插槽都寫好提供外部引用  與寫死的差別在於 #___為過濾掉寫死之後的customSlot   ex.employee.vue-->
      <template v-for="(v, i) in customSlot" :key="i" #[v.model]="scope">
        <slot :name="v.model" :row="scope.row"></slot>
      </template>

      <!-- 額外的欄位（編輯,刪除...） -->
      <template #extra="scope">
        <el-button-group>
          <ElButton v-if="permissionInfo.edit" size="small" plain type="primary" @click="handleClickEdit(scope.row)">
            <el-icon>
              <Edit />
            </el-icon>
          </ElButton>
          <ElButton v-if="permissionInfo.delete" size="small" plain type="danger" @click="handleClickDelete(scope.row.id)">
            <el-icon>
              <Delete />
            </el-icon>
          </ElButton>
        </el-button-group>
      </template>
    </baseTable>
    <page-create-form v-if="isCreate || isEdit" :pageName="config.pageName" :editFormValue="editFormValue"></page-create-form>
  </div>
</template>
<script lang="ts" setup>
import baseTable from "@/base-ui/baseTable";
import { usePermission } from "@/hooks/use-permission";
import { _useStore } from "@/store";
import pageCreateForm from "@/views/components/page-create-form/page-create-form.vue";
import mapTableConfig from "@/views/components/utils/mapTableConfig";
import { computed, defineExpose, defineProps, PropType, provide, reactive, ref, watch } from "vue";
import { IConfig } from "../utils/type";
provide("closeMask", closeMask); // 寫在dispatch下面就報錯????

const props = defineProps({
  config: {
    type: Object as PropType<IConfig>,
    required: true,
  },
});

const store = _useStore();
const permissionInfo = reactive(usePermission() as any);

const tableConfig = ref(mapTableConfig(props.config));
const customSlot = ref(tableConfig.value.tableItem.filter((v) => v.model !== "status" && v.model !== "created_at" && v.model !== "updated_at"));

const paginationInfo = ref({
  pageSize: 10,
  currentPage: 1,
  total: computed(() => store.getters["main/getCount"]),
});
const pageSize = computed(() => store.getters["main/getPageSize"]);
const currentPage = computed(() => store.getters["main/getCurrentPage"]);
watch([pageSize, currentPage], () => getPageData(), { immediate: true });

// 取資料
function getPageData(formData: any = "") {
  store.dispatch(`main/getPageData`, {
    pageName: props.config.pageName,
    query: { ...formData, limit: pageSize.value, offset: (currentPage.value - 1) * pageSize.value },
  });
}
defineExpose({ getPageData }); //script setup 以此暴露ref

// create-form相關
const list = computed(() => (store.state as any).main[`${props.config.pageName}`]);
store.dispatch("main/getPageSchema", props.config.pageName);
// 新建/編輯
const isCreate = ref(false);
const isEdit = ref(false);
const editFormValue = ref("");
const handleClickCreate = () => {
  isCreate.value = true;
};
const handleClickEdit = (data: any) => {
  isEdit.value = true;
  editFormValue.value = data;
};
function closeMask() {
  isCreate.value = false;
  isEdit.value = false;
  editFormValue.value = "";
}

//刪除
const handleClickDelete = (id: any) => {
  store.dispatch(`main/deletePageData`, {
    pageName: props.config.pageName,
    id,
  });
};
</script>
<style scoped lang="less">
table {
  .handler-group {
    ._flex();
  }
}
</style>
