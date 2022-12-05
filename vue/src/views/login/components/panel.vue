<template>
  <div class="panel">
    <div class="content">
      <div class="input">
        <el-tabs type="border-card" stretch v-model="currentTab">
          <el-tab-pane label="email" name="email">
            <template #label>
              <span class="custom-tabs-label">
                <span>Email</span>
                <el-icon><Message /></el-icon>
              </span>
            </template>
            <email ref="emailRef"></email>
          </el-tab-pane>
          <el-tab-pane label="phone" name="phone">
            <template #label>
              <span class="custom-tabs-label">
                <span>Phone</span>
                <el-icon><Iphone /></el-icon>
              </span> </template
            ><phone ref="phoneRef"></phone>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="submit">
        <div class="password">
          <el-checkbox v-model="isKeepIt" label="Keep it" size="large" />
          <el-link href="https://element.eleme.io" target="_blank" type="primary">Forgot password?</el-link>
        </div>
        <ElButton class="my-el-button" @click="handleLoginClick" type="primary">Log in</ElButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import email from "./email.vue";
import phone from "./phone.vue";

export default defineComponent({
  components: { email, phone },
  setup() {
    const currentTab = ref("email");
    const emailRef = ref<InstanceType<typeof email>>(); //cmd + 點ref 可以看到接收泛型 T 對應到ref的value，這邊會幫助在類型檢查時 會去看有沒有emailRef.value.submitForm  (當要ref包裹元件時，要用這個方法，不然會看做any無法做類型檢查)
    //                                                  搜尋  export declare interface Ref<T = any> {
    //                                                        value: T;
    //                                                        instancetypetype用法  https://www.typescriptlang.org/docs/handbook/utility-types.html#instancetypetype
    const isKeepIt = ref(true);
    const handleLoginClick = () => {
      emailRef.value?.submitForm(isKeepIt.value);
    };
    return { currentTab, emailRef, isKeepIt, handleLoginClick };
  },
});
</script>
<style scoped lang="less">
.panel {
  ._flex();
  flex-direction: column;
}
.content {
  width: 300px;
  height: 300px;
}
.input {
  .custom-tabs-label {
    ._flex();
  }
}
.submit {
  .password {
    ._flex();
    justify-content: space-between;
  }
  .my-el-button {
    width: 100%;
  }
}
</style>
