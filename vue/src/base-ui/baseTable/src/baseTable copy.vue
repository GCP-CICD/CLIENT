<template>
  <div class="base-table">
    <slot name="header"></slot>
    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" v-bind="childrenProps">
      <el-table-column v-if="selection" type="selection"></el-table-column>
      <template v-for="(v, i) in tableItem" :key="i">
        <el-table-column :prop="v.model" :label="v.label" :width="v.columnWidth ? v.columnWidth : `${v.label.length * 15}px`" show-overflow-tooltip>
          <!-- 在預設插槽加一個具名slot，引用與否由外部決定，當不引用時也有預設值(slot裡面包的)-->
          <!-- 舉例page-table引用了#table對應到:name='table' -->
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
        :page-sizes="[10, 50, 100]"
        :small="true"
        :disabled="disabled"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paginationInfo.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paginationInfo.currentPage"
        :page-size="paginationInfo.pageSize" />
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
  selection: {
    type: Boolean,
    default: false,
  },
  childrenProps: Object,

  paginationInfo: { type: Object, required: true },
});
const emit = defineEmits(["selection-change", "update:paginationInfo"]);

const handleSelectionChange = (value: any[]) => {
  emit("selection-change", value);
};

const disabled = ref(false);
const handleSizeChange = (val: number) => {
  emit("update:paginationInfo", { ...props.paginationInfo, pageSize: val });
};
const handleCurrentChange = (val: number) => {
  emit("update:paginationInfo", { ...props.paginationInfo, currentPage: val });
};
</script>
<style scoped lang="less">
.base-table {
}
</style>
