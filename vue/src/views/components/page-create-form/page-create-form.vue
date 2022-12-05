<template>
  <div class="create-form">
    <my-mask>
      <template #mask-content>
        <baseForm ref="formRef" v-bind="formConfig" :formDataProps="formData">
          <template #header>
            <h1>header slot</h1>
          </template>
          <template #footer>
            <div class="form-footer">
              <ElButton type="primary" @click="clean"> clean </ElButton>
              <ElButton type="primary" @click="submit(formRef!.formRef!)"> submit </ElButton>
            </div>
          </template>
        </baseForm>
      </template>
    </my-mask>
  </div>
</template>
<script lang="ts" setup>
import baseForm from "@/base-ui/baseForm";
import { _useStore } from "@/store";
import myMask from "@/views/components/myMask/index.vue";
import { ElForm } from "element-plus";
import { computed, defineProps, inject, ref } from "vue";
import mapSchemaToFormConfig from "./mapSchemaToFormConfig";

const props = defineProps({
  pageName: String,
});

const formDataOrigin: any = {};

const store = _useStore();
const formConfig = computed(() => {
  const config = mapSchemaToFormConfig(store.state.main.schema);
  for (const iterator of config.formItem) {
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    formDataOrigin[`${iterator.model}`] = "";
  }
  return config;
});
console.log(formConfig.value);
console.log(formDataOrigin);

const formData = ref({ ...formDataOrigin });

const closeMask = inject<() => void>("closeMask")!;

const formRef = ref<InstanceType<typeof baseForm>>();
const submit = async (formRef: InstanceType<typeof ElForm>) => {
  await formRef.validate(async (valid, fields) => {
    //script setup都不用value????
    if (valid) {
      console.log("it's valid");
      await store.dispatch(`main/create`, { pageName: props.pageName, data: formData.value });
      closeMask();
    } else {
      console.log("it's invalid", fields);
    }
  });
};
const clean = () => {
  for (const iterator of Object.keys(formData.value)) {
    formData.value[iterator] = "";
  }
};
</script>
<style scoped lang="less"></style>
