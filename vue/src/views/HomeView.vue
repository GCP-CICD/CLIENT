<template>
  <div class="home">
    <ElButton @click="open">123</ElButton>
  </div>
</template>

<script lang="ts">
import { api1 as api } from "@/lib/api";

import { defineComponent } from "vue";

export default defineComponent({
  //defineComponent函數： 從js角度看無意義，在ts中定義返回類型為type defineComponent 還可以為內部傳入的參數做類型判斷
  name: "HomeView",
  components: {},
  setup() {
    function open() {
      api.request({ method: "get", url: "/" }).then((res) => {
        console.log(res);
      });
    }

    return { open };
  },
});
</script>
