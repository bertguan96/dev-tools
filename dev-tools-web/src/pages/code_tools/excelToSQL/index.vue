<template>
  <t-layout style="background-color: white">
    <t-layout style="background-color: white">
      <t-content>
        <div>
          <t-card title="数据源" header-bordered>
            <template #actions>
              <t-select v-model="model" @change="onChange">
                <t-option key="Excel" label="Excel" value="Excel"/>
                <!--                <t-option key="GoStruct" label="GoStruct" value="GoStruct"/>-->
                <!--                <t-option key="PythonDict" label="PythonDict" value="PythonDict"/>-->
              </t-select>
            </template>
            <div style="height: 250px">
              <div id="sourceInput" style="background-color: #354154;
                  padding: 10px; height: 220px; color: white;
                  overflow-y: auto;" contenteditable="true">

              </div>
            </div>
          </t-card>

          <t-card title="表格编辑器" style="margin-top: 30px" header-bordered>
            <t-row :gutter="16">
              <t-col :span="3" id="table-editor">
                <TableEditor  :options="options"/>
              </t-col>
              <t-col :span="9" style="height: 100%">
                <t-card style="height: 100%">
                  <ParseTable :table-data="tableData"/>
                </t-card>
              </t-col>
            </t-row>
          </t-card>
        </div>
      </t-content>
    </t-layout>
  </t-layout>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {DataParse} from "./parse/parse";
import {ParseTable} from "./table";
import {EditorOptions, TableEditor} from "@/pages/code_tools/excelToSQL/table-editor";

const model = ref('');

const tableData = ref(null);

const buttonOnClick = (key: string) => {
  console.log('11')
  console.log(key)
  // 实现功能的地方
};

// 按钮配置
const options: EditorOptions = {
  buttonConfig: [
    {
      key: 'keyUpper',
      width: 100,
      colWidth: 3,
      name: '首字母大写',
      onClick: buttonOnClick,
      height: 100
    },
    {
      key: 'camelCase',
      width: 100,
      colWidth: 3,
      name: '驼峰命名',
      onClick: buttonOnClick,
      height: 100
    },
    {
      key: 'hungarian',
      width: 100,
      colWidth: 3,
      name: '匈牙利命名',
      onClick: buttonOnClick,
      height: 100
    },
    {
      key: 'copyCreate',
      width: 100,
      colWidth: 3,
      name: '复制为Create语句',
      onClick: buttonOnClick,
      height: 100
    },
    {
      key: 'copyInsert',
      width: 100,
      colWidth: 3,
      name: '复制为Insert语句',
      onClick: buttonOnClick,
      height: 100
    },
    {
      key: 'ClearData',
      width: 100,
      colWidth: 3,
      name: '清空',
      onClick: buttonOnClick,
      height: 100
    },
  ]
}

onMounted(() => {
  const sourceInput = document.getElementById('sourceInput')
  if (sourceInput) {
    sourceInput.addEventListener('paste', (e: ClipboardEvent) => {
      const clipboardData = e.clipboardData;
      if (clipboardData && sourceInput) {
        sourceInput.innerText = clipboardData.getData('text/plain');
      }
      e.preventDefault()
    });
  }
});


const onChange = (value: string) => {
  const parseData = new DataParse().parse(value);
  switch (value) {
    case 'Excel':
      tableData.value = parseData
      break;
  }
};

</script>

<style scoped>

</style>