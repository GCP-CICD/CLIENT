<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="base-form">
    <slot name="header"></slot>
    <el-form ref="formRef" :model="formDataProps" :label-width="formLabelWidth">
      <el-row>
        <template v-for="(v, i) in formItem" :key="i">
          <el-col v-bind="colLayout">
            <el-form-item :prop="v.model" :label="v.label" :rules="v.rules">
              <template v-if="v.elType === 'input' || v.elType === 'password'">
                <template v-if="v.bindOptions?.type === 'number'">
                  <el-input v-model.number="formDataProps[`${v.model}`]" v-bind="v.bindOptions" />
                </template>
                <template v-else>
                  <el-input v-model="formDataProps[`${v.model}`]" v-bind="v.bindOptions" />
                </template>
              </template>
              <template v-if="v.elType === 'select'">
                <el-select placeholder="Select" v-model="formDataProps[`${v.model}`]" v-bind="v.bindOptions">
                  <el-option v-for="(item, i) in v.options" :key="i" :label="item.label" :value="item.value" />
                </el-select>
              </template>
              <template v-if="v.elType === 'datepicker'">
                <el-date-picker v-model="formDataProps[`${v.model}`]" v-bind="v.bindOptions" />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <slot name="footer"> </slot>
  </div>
</template>
<script lang="ts">
import { ElForm } from "element-plus";
import { defineComponent, PropType, ref } from "vue";
import type { IFormItem } from "../type";

export default defineComponent({
  props: {
    formDataProps: { type: Object, required: true },
    formItem: {
      type: Array as PropType<IFormItem[]>,
      default: () => [],
    },
    formLabelWidth: {
      type: String,
      default: "50px",
    },
    colLayout: {
      type: Object,
      default: () => ({ xs: 24, sm: 24, md: 12, lg: 8, xl: 6 }),
    },
  },
  setup(props, { emit }) {
    const formRef = ref<InstanceType<typeof ElForm>>();

    return { formRef };
  },
});
</script>
<style scoped lang="less">
.base-form {
  padding: 10px;
}
.el-select {
  width: 100%;
}
</style>
