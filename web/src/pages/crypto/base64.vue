<template>
  <t-row class="row-line" :gutter="16">
    <t-col :span="6">
      Base64 加密解密
    </t-col>
  </t-row>
  <t-row class="row-line" :gutter="16">
    <t-col :span="6">
      <t-button  theme="primary" variant="outline" @click="encrypt">加密</t-button>
      <t-button style="margin-left: 10px" theme="primary" variant="outline" @click="decryption">解密</t-button>
    </t-col>
  </t-row>
  <t-row class="row-line" :gutter="16">
    <t-col :span="6">
      <Textarea v-model="normalStr" placeholder="请输入需要加密的字符串"/>
    </t-col>
    <t-col :span="6">
      <Textarea v-model="cryptoStr" placeholder="请输入需要解密的字符"/>
    </t-col>
  </t-row>
</template>

<script setup lang="ts">
import {Input, Textarea} from 'tdesign-vue-next';
import {ref} from "vue";

const cryptoStr = ref('');
const normalStr = ref('');

const encrypt = () => {
  cryptoStr.value = btoa(normalStr.value)
};

const decryption = () => {
  normalStr.value = atob(cryptoStr.value)
};
</script>

<style scoped>
.row-line {
  margin-top: 10px;
}

.col-line {
  margin-bottom: 10px;
}

/deep/ .t-textarea__inner {
  height: 300px;
}

</style>