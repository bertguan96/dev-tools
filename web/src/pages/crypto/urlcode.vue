<template>
  <t-row class="row-line" :gutter="16">
    <t-col :span="6">
        URL编码解码
    </t-col>
  </t-row>
  <t-row class="row-line" :gutter="16">
    <t-col :span="6">
      <t-button theme="primary" variant="outline" @click="decryption">解密</t-button>
      <t-button style="margin-left: 10px" theme="primary" variant="outline" @click="encrypt">加密</t-button>
    </t-col>
  </t-row>
  <t-row class="row-line" :gutter="16">
    <t-col :span="6">
      <Input class="col-line "  v-model="urlCode" placeholder="请输入URLCode..."/>
      <Textarea v-model="normalStr"/>
    </t-col>
  </t-row>
</template>

<script setup lang="ts">
import { Input, Textarea } from 'tdesign-vue-next';
import {ref} from "vue";

const urlCode = ref('');
const normalStr = ref('');

const decryption = () => {
  normalStr.value=decodeURI(urlCode.value)
};

const encrypt = () => {
  normalStr.value=encodeURI(urlCode.value)
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