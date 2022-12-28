<template>
  <div class="create-form">
    <my-mask>
      <template #mask-content>
        <baseForm ref="formRef" v-bind="formConfig" :formDataProps="formData">
          <template #header>
            {{ isEdit ? `Edit ${pageName}` : `New ${pageName}` }}
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
import baseForm, { IForm } from "@/base-ui/baseForm";
import { _useStore } from "@/store";
import myMask from "@/views/components/myMask/myMask.vue";
import { ElForm } from "element-plus";
import { computed, defineProps, inject, ref } from "vue";
import mapSchemaToFormConfig from "./mapSchemaToFormConfig";
//為什麼不能用./type
interface IEditFormValue {
  id: number;
  [key: string]: any;
}
interface IProps {
  pageName: string;
  editFormValue: IEditFormValue | string;
}
const props = defineProps<IProps>();

const isEdit = computed(() => !!(props.editFormValue && true));
const formDataOrigin: any = {};

const store = _useStore();
const formConfig = ref<IForm>(mapSchemaToFormConfig(store.state.main.schema, props.pageName, isEdit.value));
for (const iterator of formConfig.value.formItem) {
  formDataOrigin[`${iterator.model}`] = "";
}

const formData = ref({ ...formDataOrigin });

if (isEdit.value) {
  for (const v of Object.keys(formDataOrigin)) {
    formData.value[v] = (props.editFormValue as IEditFormValue)[v];
  }
}

const closeMask = inject<() => void>("closeMask")!;

const formRef = ref<InstanceType<typeof baseForm>>();
const submit = async (formRef: InstanceType<typeof ElForm>) => {
  await formRef.validate(async (valid, fields) => {
    //script setup不用value????
    if (valid) {
      console.log("it's valid");
      if (!isEdit.value) {
        await store.dispatch(`main/createPageData`, { pageName: props.pageName, data: formData.value });
      } else {
        await store.dispatch(`main/editPageData`, {
          pageName: props.pageName,
          id: (props.editFormValue as IEditFormValue).id,
          data: formData.value,
        });
      }
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
