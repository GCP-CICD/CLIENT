<template>
  <div class="base-table">
    <slot name="header"></slot>
    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column v-if="tableSelection" type="selection"></el-table-column>
      <template v-for="(v, i) in tableItem" :key="i">
        <el-table-column :prop="v.model" :label="v.label" :width="v.tableWidth ? v.tableWidth : `${v.label.length * 20}px`">
          <!-- 在預設插槽加一個具名slot，引用與否由外部決定，當不引用時也有預設值(slot裡面包的)-->
          <!-- 外部引用： <template #status="scope"> {{ scope.row }} </template> 其中status對應到slot name-->
          <!-- 數據流順序：default接收scope 傳入:row  外部引用時接收scope -->
          <template #default="scope">
            <slot :name="v.model" :row="scope.row[v.model]"> {{ scope.row[v.model] }} </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <slot name="footer">
      <el-pagination
        v-model:current-page="currentPage4"
        v-model:page-size="pageSize4"
        :page-sizes="[100, 200, 300, 400]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </slot>
  </div>
</template>
<script lang="ts" setup>
import { defineEmits, defineProps, PropType, ref } from "vue";
const props = defineProps({
  tableData: { type: Array as PropType<any>, required: true },
  tableItem: {
    type: Object,
    required: true,
  },
  tableSelection: {
    type: Boolean,
    default: false,
  },
  paginationInfo: { type: Object, required: true },
});
const emit = defineEmits(["selection-change"]);

const handleSelectionChange = (value: any[]) => {
  emit("selection-change", value);
};

const currentPage1 = ref(5);
const currentPage2 = ref(5);
const currentPage3 = ref(5);
const currentPage4 = ref(4);
const pageSize2 = ref(100);
const pageSize3 = ref(100);
const pageSize4 = ref(100);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
</script>
<style scoped lang="less">
.base-table {
}
</style>
