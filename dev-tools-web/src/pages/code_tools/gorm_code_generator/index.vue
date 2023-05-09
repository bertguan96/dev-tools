<template>
  <t-card bordered :style="{ height: '600px' }">
    <t-row :gutter="16">
      <t-col :span="7">
        <t-card bordered :style="{ height: '550px' }" class="output" title="输出区">
          <div id="input" class="hljs" contenteditable="true"></div>
        </t-card>
      </t-col>
      <t-col :span="5">
        <t-card bordered :style="{ height: '550px' }" title="配置区">
          <div>
            <t-form ref="form" :rules="FORM_RULES" :data="formData" :colon="true" @reset="onReset" @submit="onSubmit">
              <t-form-item label="结构体" name="struct">
                <t-textarea :autosize="{ minRows: 5, maxRows: 5 }"
                            v-model="formData.struct" placeholder="请输入结构体"
                            @change="getTableName"
                            ></t-textarea>
              </t-form-item>
              <t-form-item label="表名" name="tableName">
                <t-input v-model="formData.tableName" placeholder="请输入表名" ></t-input>
              </t-form-item>
              <t-form-item label="生成类型" name="generatorType">
                <t-select v-model="formData.generatorType" clearable>
                  <t-option key="create" label="创建" value="CREATE"/>
                  <t-option key="add" label="新增" value="ADD"/>
                  <t-option key="delete" label="删除" value="DELETE"/>
                  <t-option key="select" label="查询" value="SELECT"/>
                  <t-option key="update" label="修改" value="UPDATE"/>
                </t-select>
              </t-form-item>
              <t-form-item label="配置" name="config">
                <t-checkbox-group v-model="formData.config" :options="configList"></t-checkbox-group>
              </t-form-item>
              <t-form-item>
                <t-space size="small">
                  <t-button theme="primary" type="submit">生成</t-button>
                  <t-button theme="default" variant="base" type="reset">重置</t-button>
                  <t-button theme="success" variant="base" @click="copyCode">复制</t-button>
                </t-space>
              </t-form-item>
            </t-form>
          </div>
        </t-card>
      </t-col>
    </t-row>
  </t-card>
</template>

<script setup lang="ts">
import {ref, reactive, onMounted} from 'vue';
import {MessagePlugin} from 'tdesign-vue-next';
import {FormData} from "@/pages/code_tools/gorm_code_generator/data";
import {CodeHandler, parseGoStruct, toSnakeCase} from "@/pages/code_tools/gorm_code_generator/code_handler";
import {html_beautify} from "js-beautify";
import 'highlight.js/styles/monokai-sublime.css'
import hljs from "highlight.js";
import go from 'highlight.js/lib/languages/go';
import {ClipboardTools} from "@/tools/clipboard";

const FORM_RULES = {
  struct: [{required: true, message: '结构体为必填项'}],
  generatorType: [{required: true, message: '生成类型为必填项'}],
};

const formData: FormData = reactive({
  struct: '',
  generatorType: '',
  tableName: '',
  config: [],
});

const form = ref(null);
const outputCode = ref('');

const getTableName = () => {
  const structs = parseGoStruct(formData.struct);
  for (let key of Object.keys(structs)) {
    formData.tableName = toSnakeCase(key);
  }
};

const copyCode = () => {
  if (outputCode.value === "") {
      MessagePlugin.warning("请先生成代码。");
      return;
  }
  ClipboardTools.writeToClipboard(outputCode.value);
  return;
};

// 配置列表
const configList = [
  {label: '开启事务', value: 'openTransaction'},
];

const onReset = () => {
  MessagePlugin.success('重置成功');
  form.value = null;
};

onMounted(() => {
  hljs.registerLanguage('go', go);
});

const onSubmit = () => {
  MessagePlugin.success('提交成功');
  let code = CodeHandler.doHandler(formData)[0];
  const input = document.getElementById('input');
  if (input) {
    outputCode.value = code;
    input.innerHTML = `<pre>${code}</pre>`;
  }
};

</script>

<style scoped>
#input {
  height: 100%;
  display: flex;
  width: 100%;
  min-height: var(--td-comp-size-xxxl);
  border: 1px solid var(--td-border-level-2-color);
  border-radius: var(--td-radius-default);
  padding: calc(calc(var(--td-comp-size-m) - var(--td-line-height-body-medium)) / 2) var(--td-comp-paddingLR-s);
  font: var(--td-font-body-medium);
  resize: vertical;
  outline: none;
  box-sizing: border-box;
  overflow-y: auto;
}
.output /deep/.t-card__body {
  height: 350px;
}
pre{
  white-space:pre-wrap;
  white-space:-moz-pre-wrap;
  white-space:-o-pre-wrap;
  word-wrap:break-word;
}
</style>