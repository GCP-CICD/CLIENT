<template>
  <div class="base-table">
    <slot name="header"></slot>
    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" v-bind="childrenProps" :default-sort="defaultSort">
      <el-table-column v-if="selection" type="selection" align="center"></el-table-column>
      <template v-for="(v, i) in itemList" :key="i">
        <el-table-column :prop="v.model" :label="v.label" :width="v.columnWidth" show-overflow-tooltip align="center" v-bind="v.bindOptions">
          <!-- 在預設插槽加一個具名slot，引用與否由外部決定，當不引用時也有預設值(slot裡面包的)-->
          <!-- 舉例page-table引用了#table對應到:name='table' -->
          <!-- 外部引用： <template #status="scope"> {{ scope.row }} </template> 其中status對應到slot name-->
          <!-- 數據流順序：default接收scope 傳入:row  外部引用時接收scope -->
          <template #default="scope">
            <slot :name="v.model" :row="scope.row[v.model]"> {{ scope.row[v.model] }} </slot>
          </template>
        </el-table-column>
      </template>

      <!-- 用v-slot拿到 <el-table-column>裡的資料，原理應該是<el-table-column>內部會傳:row這裡才拿得到-->
      <!-- https://vuejs.org/api/built-in-directives.html#v-slot -->
      <el-table-column label="操作" align="center" width="100px">
        <template v-slot="scope">
          <slot name="extra" :row="scope.row" />
        </template>
      </el-table-column>
    </el-table>
    <slot name="footer">
      <el-pagination
        :page-sizes="[10, 50, 100]"
        :small="true"
        :disabled="disabled"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize" />
    </slot>
  </div>
</template>
<script lang="ts" setup>
import { _useStore } from "@/store";
import { computed, defineEmits, defineProps, PropType, ref } from "vue";
import type { IDefaultSort } from "../type";
const store = _useStore();

const props = defineProps({
  tableData: { type: Array as PropType<any>, required: true },
  itemList: {
    type: Object,
    required: true,
  },
  selection: {
    type: Boolean,
    default: false,
  },
  childrenProps: Object,
  defaultSort: Object as PropType<IDefaultSort>,
});
const total = computed(() => store.getters["main/getPageCount"]);
const pageSize = computed(() => store.getters["main/getPageSize"]);
const currentPage = computed(() => store.getters["main/getCurrentPage"]);
const emit = defineEmits(["selection-change"]);

const handleSelectionChange = (value: any[]) => {
  emit("selection-change", value);
};

const disabled = ref(false);

const handleSizeChange = (val: number) => {
  store.dispatch("main/changePageSize", val);
};
const handleCurrentChange = (val: number) => {
  store.dispatch("main/changeCurrentPage", val);
};
</script>
<style lang="less">
.base-table {
  .el-table__header {
    display: inline-block;
  }
  .el-table .el-table__cell {
    z-index: unset;
  }
}
</style>
