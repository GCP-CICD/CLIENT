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
<script lang="ts">
import baseForm from "@/base-ui/baseForm";
import { _useStore } from "@/store";
import mapFormConfig from "@/views/components/utils/mapFormConfig";
import { defineComponent, PropType, ref } from "vue";
import { IConfig } from "../utils/type";

export default defineComponent({
  components: { baseForm },
  props: {
    config: {
      type: Object as PropType<IConfig>,
      required: true,
    },
  },
  setup(props) {
    const formConfig = ref(mapFormConfig(props.config));
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
    };

    const store = _useStore();
    const submit = () => {
      store.dispatch(`main/readData`, { pageName: props.config.pageName, query: { ...formData.value } });
    };

    return { formConfig, formData, clean, submit };
  },
});
</script>
<style scoped lang="less"></style>
