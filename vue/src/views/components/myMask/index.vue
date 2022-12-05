<template>
  <div class="my-mask">
    <div class="mask" @click="closeMask"></div>
    <div class="mask-content">
      <el-icon @click="closeMask"><Close /></el-icon>
      <slot name="mask-content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";

export default defineComponent({
  // props: { showMask: { type: Boolean, required: true } },
  setup(props, { emit }) {
    const closeMask = inject<() => void>("closeMask")!;

    return { closeMask };
  },
});
</script>

<style lang="less">
.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: #333;
  opacity: 0.5;
}
.mask-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 11;
  > div {
    background-color: white;
    border-radius: 5px;
  }
  max-height: 80vh;
  overflow-y: scroll;
}
</style>
