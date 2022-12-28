<template>
  <div class="search-form">
    <baseForm v-bind="formConfig" :formDataProps="formData">
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
import mapFormConfig from "@/views/components/utils/mapFormConfig";
import { defineEmits, defineProps, PropType, ref } from "vue";
import { IConfig } from "../utils/type";

const props = defineProps({
  config: {
    type: Object as PropType<IConfig>,
    required: true,
  },
});
const emits = defineEmits<{ (...args: any): void }>();
// const emits = defineEmits(["handleClickReset", "handleClickSearch"]);

const formConfig = ref(mapFormConfig(props.config)); //是否共用schematoconfig
const formDataOrigin: any = {};
for (const iterator of formConfig.value.formItem) {
  formDataOrigin[`${iterator.model}`] = "";
}
//Day 19: 你可能不知道的 v-model - 為何多選綁定陣列不能用 reactive()? https://ithelp.ithome.com.tw/m/articles/10303899
const formData = ref({ ...formDataOrigin }); //淺拷貝卻一直改變formDataOrigin????

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
