<template>
  <t-row class='row-line' :gutter='16'>
    <t-col :span='3'>
      <t-input theme='primary' v-model='structName' placeholder='请输入结构名称' aria-required='true'></t-input>
    </t-col>
    <t-col :span='3'>
      <t-button theme='primary' variant='outline' @click='formatJson'>转go结构</t-button>
    </t-col>
    <t-col :span='1'>
      <t-button theme='primary' variant='outline' @click='copyGo'>复制</t-button>
    </t-col>
    <t-col :span='1'>
      <t-button theme='primary' variant='outline' @click='downloadFile'>下载</t-button>
    </t-col>
  </t-row>
  <t-row class='row-line' :gutter='16'>
    <t-col :span='6'>
      <Textarea v-model='jsonStr'/>
    </t-col>
    <t-col :span='6'>
      <CodeEditor class='codeEditor' ref='codeEditor'/>
    </t-col>
  </t-row>
</template>

<script lang='ts' setup>
import {MessagePlugin, Textarea} from 'tdesign-vue-next';
import {ref} from 'vue';
import CodeEditor from '@/components/codemirror/code_editor.vue';
import {ClipboardTools} from '@/tools/clipboard';


const jsonStr = ref('')
const codeEditor = ref(CodeEditor) // 通过 ref 绑定子组件
const structName = ref('');

const formatJson = () => {
  const struct = structName.value;
  if (struct == '') {
    jsonStr.value = '请输入结构体名称！';
    return;
  }
  let jsonObj = null;
  try {
    jsonObj = JSON.parse(jsonStr.value);
  } catch (e) {
    jsonStr.value = e as string
  }
  // JSON显示
  const outputValues = '';
  const structNameType = `type ${struct} struct { \n`;

  // Model            string                 `json:'model'`
  let structTypes = '';
  for (const key in jsonObj) {
    const types = ` ${key.replace(key[0], key[0].toUpperCase())}  ${replaceType(jsonObj[key])}  \`json:'${firstNameLowCase(key)}'\`\n`;
    structTypes = structTypes.concat(types);
  }
  const view = codeEditor.value;
  if (view) {
    view.clearContext();
    view.setText(structNameType + structTypes + '}')
  }
}

const firstNameLowCase = (key: string) => {
  return key.replace(key[0], key[0].toLowerCase())
}

const replaceType = (value: any) => {
  const type = typeof value;
  if (type == 'number') {
    return 'int';
  } else if (type == 'boolean') {
    return 'bool';
  } else {
    return type;
  }
}

const getEditorText = (): string => {
  const view = codeEditor.value;
  if (view) {
    return view.getText()
  }
  return ''
}

const copyGo = () => {
  const view = codeEditor.value;
  if (view) {
    ClipboardTools.writeToClipboard(getEditorText())
  }
}

const downloadFile = () => {
  const text = getEditorText()
  if (text === '{}') {
    MessagePlugin.warning('内容为空！')
    return
  }
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', firstNameLowCase(structName.value) + '.go');
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

</script>

<style scoped>
.row-line {
  margin-top: 10px;
}

/deep/ .t-textarea__inner {
  height: 300px;
}

.codeEditor {
  height: 300px;
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