<!-- 滿足單向數據流的版本，但rules不生效  因為validator拿不到value -->

<template>
  <div class="baseForm">
    <slot name="header"></slot>
    <el-form :label-width="formLabelWidth">
      <el-row>
        <template v-for="(v, i) in formItem" :key="i">
          <el-col v-bind="colLayout">
            <el-form-item :label="v.label" :rules="v.rules">
              <template v-if="v.type === 'input' || v.type === 'password'">
                <!-- 綁定元件v-model時 元件內部就會有modelValue (對el-input來說 v-model與model-value區別????) -->
                <el-input :model-value="formDataProps[`${v.model}`]" v-bind="v.bindOptions" @update:modelValue="handleInput($event, v.model)" />
              </template>
              <template v-if="v.type === 'select'">
                <el-select
                  placeholder="Select"
                  :model-value="formDataProps[`${v.model}`]"
                  v-bind="v.bindOptions"
                  @update:modelValue="handleInput($event, v.model)">
                  <el-option v-for="(item, i) in v.options" :key="i" :label="item.label" :value="item.value" />
                </el-select>
              </template>
              <template v-if="v.type === 'datepicker'">
                <el-date-picker :model-value="formDataProps[`${v.model}`]" v-bind="v.bindOptions" @update:modelValue="handleInput($event, v.model)" />
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
import { defineComponent, PropType } from "vue";
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
    const handleInput = (value: any, model: string) => {
      emit("changeFormData", { ...props.formDataProps, [model]: value });
      // emit("update:modelValue", { ...props.formDataProps, [model]: value });  // 若外層用v-model也可以這樣
    };

    return { handleInput };
  },
});
</script>
<style scoped lang="less">
.baseForm {
  padding: 10px;
}
.el-select {
  width: 100%;
}
</style>
