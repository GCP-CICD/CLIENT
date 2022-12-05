<template>
  <div class="email">
    <el-form ref="formRef" :model="form" status-icon :rules="rules" label-width="120px" class="demo-form">
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email" type="email" />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="form.password" type="password" autocomplete="off" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import _cache from "@/lib/_cache";
import { ElForm } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {},
  setup() {
    const store = useStore();
    const formRef = ref<InstanceType<typeof ElForm>>();
    const form = reactive({
      email: _cache.getItem("email") ?? "",
      password: _cache.getItem("password") ?? "",
    });

    const rules = reactive({
      email: [
        { type: "email", required: true, message: "Please input email", trigger: "change" },
        // { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "change" },
      ],
      password: [
        {
          required: true,
          validator(rule: any, value: any, callback: any) {
            if (value === "") {
              callback(new Error("Please input the email again"));
            } else {
              callback();
            }
          },
          trigger: "blur",
        },
      ],
    });
    async function submitForm(isKeepIt: boolean) {
      await formRef.value?.validate((valid, fields) => {
        if (valid) {
          console.log("it's valid");
          if (isKeepIt) {
            _cache.setItem("email", form.email);
            _cache.setItem("password", form.password);
          } else {
            _cache.deleteItem("email");
            _cache.deleteItem("password");
          }
          store.dispatch("login/emailLogin", { ...form });
        } else {
          console.log("it's invalid", fields);
        }
      });
    }

    return { formRef, form, rules, submitForm };
  },
});
</script>
