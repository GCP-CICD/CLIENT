import pageTable from "@/views/components/page-table/page-table.vue";
import { ref } from "vue";

export function usePageSearch() {
  const pageTableRef = ref<InstanceType<typeof pageTable>>();

  const handleClickReset = () => {
    pageTableRef.value?.getPageData();
  };
  const handleClickSearch = (queryInfo: any) => {
    pageTableRef.value?.getPageData(queryInfo);
  };
  return [pageTableRef, handleClickReset, handleClickSearch];
}
