<template>
  <t-row class="row-line" :gutter="16">
    <t-col :span="6">
      <t-button theme="primary" variant="outline" @click="formatJson">JSON格式化</t-button>
    </t-col>
  </t-row>
  <t-row class="row-line" :gutter="16">
    <t-col :span="6">
      <Textarea v-model="jsonStr" placeholder="请输入需要格式化的json字符串..."/>
    </t-col>
    <t-col :span="6">
      <CodeEditor class="codeEditor" ref="codeEditor" />
    </t-col>
  </t-row>
</template>

<script setup lang="ts">
import { Textarea } from 'tdesign-vue-next';
import CodeEditor from '@/components/codemirror/code_editor.vue';
import {ref} from "vue";

const jsonStr = ref('')
const codeEditor = ref(CodeEditor) // 通过 ref 绑定子组件

const formatJson = () => {
  let jsonObj = null;
  try {
    jsonObj = JSON.parse(jsonStr.value);
  } catch (e) {
    jsonStr.value = e as string
  }
  // JSON显示
  const data = JSON.stringify(jsonObj, null, 4)
  const view = codeEditor.value;
  if (view) {
    view.setText(data)
  }
}
</script>

<style scoped>
.row-line {
  margin-top: 10px;
}

/deep/ .t-textarea__inner {
  height: 600px;
}

.codeEditor {
  height: 600px;
  display: flex;
  width: 100%;
  min-height: var(--td-comp-size-xxxl);
  border: 1px solid var(--td-border-level-2-color);
  border-radius: var(--td-radius-default);
  padding: calc(calc(var(--td-comp-size-m) - var(--td-line-height-body-medium)) / 2) var(--td-comp-paddingLR-s);
  background-color: var(--td-bg-color-specialcomponent);
  font: var(--td-font-body-medium);
  color: var(--td-text-color-primary);
  resize: vertical;
  outline: none;
  transition: all cubic-bezier(0.38, 0, 0.24, 1) 0.2s, height 0s;
  box-sizing: border-box;
}
</style>