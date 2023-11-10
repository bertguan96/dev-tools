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
            <template #actions>
              <t-input v-model="tableName" placeholder="请输入表名"/>
            </template>
            <t-row :gutter="16">
              <t-col :span="3" id="table-editor">
                <TableEditor
                    :options="options"
                    :is-enabled="isEnabled"/>
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
import {onMounted, onUnmounted, ref} from "vue";
import {DataParse} from "./parse/parse";
import {ParseTable} from "./table";
import {EditorOptions, TableEditor} from "@/pages/code_tools/excelToSQL/table-editor";
import {ExcelToSqlTools} from "@/pages/code_tools/excelToSQL/excel_to_sql_tools";
import {ExcelDataParse} from "@/pages/code_tools/excelToSQL/parse/parse.data";
import {ClipboardTools} from "@/tools/clipboard";

const model = ref('');

const tableData = ref({
  header: [],
  value:[]
});

const isEnabled = ref(true);

const excelToSql = ExcelToSqlTools.getInstance(); // 创建表格

const tableName = ref('');

const buttonOnClick = (key: string) => {
  const data = tableData.value;
  if (data) {
    const excelDataParse = data as ExcelDataParse;
    if (!excelDataParse) {
      return
    }
    // 实现功能的地方
    switch (key) {
      case 'keyUpper':
        excelToSql.firstKeyUpper(excelDataParse.header)
        break;
      case 'camelCase':
        excelToSql.camel2Hungarian(excelDataParse.header)
        break;
      case 'hungarian':
        excelToSql.hungarian2Camel(excelDataParse.header);
        break;
      case 'copyCreate':
        ClipboardTools.writeToClipboard(excelToSql.generateCreateSql(excelDataParse, tableName.value));
        break;
      case 'copyInsert':
        ClipboardTools.writeToClipboard(excelToSql.generateInsertSql(excelDataParse, tableName.value));
        break;
      case 'clearData':
        const sourceInput = document.getElementById('sourceInput');
        if (sourceInput) {
          sourceInput.innerText = ''; // 清空输出
          tableData.value = {
            header: [],
            value:[]
          };
        }
        break
    }
    // @ts-ignore
    tableData.value = excelDataParse;
  }
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
      name: '驼峰转匈牙利',
      onClick: buttonOnClick,
      height: 100
    },
    {
      key: 'hungarian',
      width: 100,
      colWidth: 3,
      name: '匈牙利转驼峰',
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
      key: 'clearData',
      width: 100,
      colWidth: 3,
      name: '重置',
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
        isEnabled.value = false
      }
      e.preventDefault()
    });
    sourceInput.addEventListener('keyup', onKeyUp);
  }
});

onUnmounted(() => {
  const sourceInput = document.getElementById('sourceInput');
  if (sourceInput) {
    sourceInput.removeEventListener('paste', onPaste);
    sourceInput.removeEventListener('keyup', onKeyUp);
  }
});

const onPaste = (e: ClipboardEvent) => {
  const sourceInput = document.getElementById('sourceInput');
  if (sourceInput) {
    const clipboardData = e.clipboardData;
    if (clipboardData && sourceInput) {
      sourceInput.innerText = clipboardData.getData('text/plain');
      isEnabled.value = false
    }
    e.preventDefault()
  }
};

const onKeyUp = (e: KeyboardEvent) => {
  const sourceInput = document.getElementById('sourceInput');
  if (sourceInput && sourceInput.textContent === '') {
    isEnabled.value = true
  } else {
    isEnabled.value = false
  }
};


const onChange = (value: string) => {
  const parseData = new DataParse().parse(value);
  switch (value) {
    case 'Excel':
      // @ts-ignore
      tableData.value = parseData
      break;
  }
};

</script>

<style scoped>

</style>