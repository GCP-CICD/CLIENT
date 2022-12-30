<template>
  <div class="search-form">
    <baseForm v-bind="config" :formDataProps="formData">
      <template #header>
        <h1>header slot</h1>
      </template>
      <template #footer>
        <div class="form-footer">
          <ElButton type="primary" @click="clean"> clean </ElButton>
          <ElButton type="primary" @click="submit"> submit </ElButton>
        </div>
      </template>
    </baseForm>
  </div>
</template>
<script lang="ts" setup>
import baseForm from "@/base-ui/baseForm";
import usePageConfig from "@/hooks/use-page-config";
import { defineEmits, defineProps, PropType, ref, watch } from "vue";

const props = defineProps({
  config: {
    type: Object as PropType<any>,
    required: true,
  },
});
const emits = defineEmits<{ (...args: any): void }>();
// const emits = defineEmits(["handleClickReset", "handleClickSearch"]);

const { config } = usePageConfig({ pageType: "searchForm", pageConfig: props.config["searchForm"], itemList: props.config.itemList });

const formDataOrigin: any = {};
//Day 19: 你可能不知道的 v-model - 為何多選綁定陣列不能用 reactive()? https://ithelp.ithome.com.tw/m/articles/10303899
const formData = ref({ ...formDataOrigin }); //淺拷貝卻一直改變formDataOrigin????

watch(
  () => config,
  (n, o) => {
    for (const iterator of n.value?.itemList) {
      formDataOrigin[`${iterator.model}`] = "";
    }
    formData.value = { ...formDataOrigin };
  },
  { immediate: true },
);

const clean = () => {
  for (const iterator of Object.keys(formData.value)) {
    formData.value[iterator] = "";
  }
  emits("handleClickReset");
};

const submit = () => {
  emits("handleClickSearch", formData.value);
};
</script>

<style scoped lang="less"></style>
