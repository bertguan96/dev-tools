<template>
  <t-row class="row-line" :gutter="16">
    <t-col :span="6">
      md5加密
    </t-col>
  </t-row>
  <t-row class="row-line" :gutter="16">
    <t-col :span="6">
      <t-button  theme="primary" variant="outline" @click="encrypt">加密</t-button>
    </t-col>
  </t-row>
  <t-row class="row-line" :gutter="16">
    <t-col :span="6">
      <Input class="col-line " v-model="normalStr" placeholder="请输入需要加密的字符串"/>
      <Textarea v-model="cryptoStr" placeholder="请输入需要解密的字符"/>
    </t-col>
    <t-col :span="6">
    </t-col>
  </t-row>
</template>

<script setup lang="ts">
import {Textarea, Input} from 'tdesign-vue-next';
import {ref} from "vue";

import cryptoJs from 'crypto-js';


const cryptoStr = ref('');
const normalStr = ref('');

const encrypt = () => {
  cryptoStr.value = cryptoJs.MD5(normalStr.value).toString()
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