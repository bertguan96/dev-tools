<template>
  <div class="app-page">
    <div class="box">
      <div id="app-header">
        <BertHeader />
      </div>
      <t-card id="app-container" class="app-container">
        <RouterView />
      </t-card>
      <div id="app-footer">
<!--        渝ICP备2021002511号-2-->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BertHeader } from './components/layout/header';
import {onMounted} from "vue";

onMounted(() => {
  // 动态计算宽度
  const app = document.getElementById('app')!;
  const appHeader = document.getElementById('app-header')!;
  const appContainer = document.getElementById('app-container')!;
  const appFooter = document.getElementById('app-footer')!;

  if (appContainer) {
    appContainer.style.height = `${app.clientHeight - appHeader.clientHeight - appFooter.clientHeight}px`;
  }

})

</script>

<style scoped>
.app-page,
.box{
  background-color: #ededed;
  height: 100%;
  width: 100%;
}
#app-footer {
  text-align: center;
}

.app-container  {
  height: 100%;
  width: 100%;
}
</style>
