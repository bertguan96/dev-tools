<template>
    <t-row class="row-line" :gutter="16">
      <t-col :span="6">
          基于词集模型(Set of Word)计算文字向量<br>
          <a target="_blank" href="https://deeplearning-doc.readthedocs.io/en/latest/deeplearning/NLP/NLP-text-vector.html">文字向量模型</a>
      </t-col>
    </t-row>
    <t-row class="row-line" :gutter="16">
      <t-col :span="6">
        <t-button theme="primary" variant="outline" @click="doVec">计算</t-button>
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
  
  const doVec = () => {
    normalStr.value=decodeURI(urlCode.value)
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