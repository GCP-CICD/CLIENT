import pageCreateForm from "@/views/components/page-create-form/page-create-form.vue";

import { ref } from "vue";
type callBackFn = () => any;

export function usePageCreate(createCb?: callBackFn, editCb?: callBackFn) {
  const pageCreatFormRef = ref<InstanceType<typeof pageCreateForm>>();

  const handleClickCreate = () => {
    // pageCreatFormRef.value?.handleClickCreate();
    createCb && createCb();
  };
  const handleClickEdit = (item: any) => {
    // pageCreatFormRef.value?.handleClickEdit();
    editCb && editCb();
  };
  return [pageCreatFormRef, handleClickCreate, handleClickEdit];
}
