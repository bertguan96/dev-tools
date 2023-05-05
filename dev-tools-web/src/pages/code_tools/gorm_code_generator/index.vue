<template>
  <t-card bordered :style="{ height: '600px' }">
    <t-row :gutter="16">
      <t-col :span="7">
        <t-card bordered :style="{ height: '550px' }" title="输出区">
          <div id="input" contenteditable="true"></div>
        </t-card>
      </t-col>
      <t-col :span="5">
        <t-card bordered :style="{ height: '550px' }" title="配置区">
          <div>
            <t-form ref="form" :rules="FORM_RULES" :data="formData" :colon="true" @reset="onReset" @submit="onSubmit">
              <t-form-item label="结构体" name="struct">
                <t-textarea :autosize="{ minRows: 5, maxRows: 5 }" v-model="formData.struct" placeholder="请输入结构体"
                            @enter="onEnter"></t-textarea>
              </t-form-item>
              <t-form-item label="表名" name="tableName">
                <t-input v-model="formData.tableName" placeholder="请输入表名" @enter="onEnter"></t-input>
              </t-form-item>
              <t-form-item label="生成类型" name="generatorType">
                <t-select v-model="formData.generatorType" @change="onEnter" clearable>
                  <t-option key="create" label="创建" value="create" />
                  <t-option key="add" label="新增" value="add"/>
                  <t-option key="delete" label="删除" value="delete" />
                  <t-option key="select" label="查询" value="select" />
                  <t-option key="update" label="修改" value="update" />
                </t-select>
              </t-form-item>
              <t-form-item label="配置" name="config">
                <t-checkbox-group v-model="formData.config" :options="configList" @change="onEnter"></t-checkbox-group>
              </t-form-item>
              <t-form-item>
                <t-space size="small">
                  <t-button theme="primary" type="submit">生成</t-button>
                  <t-button theme="default" variant="base" type="reset">重置</t-button>
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
import {ref, reactive} from 'vue';
import {MessagePlugin} from 'tdesign-vue-next';

const FORM_RULES = {
  struct: [{required: true, message: '结构体为必填项'}],
  generatorType: [{required: true, message: '生成类型为必填项'}],
};

const formData = reactive({
  struct: '',
  generatorType: '',
  tableName: '',
  config: [],
});

const form = ref(null);

// 配置列表
const configList = [
  {label: '开启事务', value: 'openTransaction'},
];

const onReset = () => {
  MessagePlugin.success('重置成功');
};

const onSubmit = ({validateResult, firstError}) => {
  if (validateResult === true) {
    MessagePlugin.success('提交成功');
  } else {
    console.log('Validate Errors: ', firstError, validateResult);
    MessagePlugin.warning(firstError);
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const submitForm = async () => {
  form.value.submit();
  form.value.submit({showErrorMessage: false});

  // 校验数据，代码有效，勿删
  // form.value.validate();

  // 校验数据：只提交和校验，不在表单中显示错误文本信息。下方代码有效，勿删
  // form.value.validate({ showErrorMessage: false }).then((validateResult) => {
  //   if (validateResult && Object.keys(validateResult).length) {
  //     const firstError = Object.values(validateResult)[0]?.[0]?.message;
  //     MessagePlugin.warning(firstError);
  //   }
  // });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const resetForm = () => {
  form.value.reset();
  // 下方为示例代码，有效，勿删
  // form.value.reset({ type: 'initial' });
  // form.value.reset({ type: 'empty' });
  // form.value.reset({ type: 'initial', fields: ['name'] });
  // form.value.reset({ type: 'empty', fields: ['name'] });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const validateOnly = async () => {
  const result = await form.value.validateOnly();
  MessagePlugin.success('打开控制台查看校验结果');
  console.log('validateOnly', result);
};

// 禁用 Input 组件，按下 Enter 键时，触发 submit 事件
const onEnter = (_, {e}) => {
  console.log(e)
  console.log(form.value)
  console.log(formData)
  e.preventDefault();
};
</script>

<style scoped>

</style>