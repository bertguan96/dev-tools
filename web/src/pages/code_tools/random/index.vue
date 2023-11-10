<template>
  <t-card title="随机字符生成器" header-bordered>
    <t-row>
      <t-form style="width: 500px" :rules="FORM_RULES" :data="formData" :colon="true"
              @submit="onSubmit">
        <t-form-item label="基础参数" name="vars" initial-data="['1']">
          <t-checkbox-group v-model="formData.vars">
            <t-checkbox value="1">大写字母</t-checkbox>
            <t-checkbox value="2">小写字母</t-checkbox>
            <t-checkbox value="3">数字</t-checkbox>
          </t-checkbox-group>
        </t-form-item>
        <t-form-item label="自定义参数" name="customParameter">
          <t-input v-model="formData.customParameter" placeholder="随机种子数"/>
        </t-form-item>
        <t-form-item label="请输入位数" name="len">
          <t-input-number v-model="formData.len"  placeholder="位数"/>
        </t-form-item>
        <t-form-item label="结果">
          <t-textarea v-model="formData.result" placeholder="请输入结果" :autosize="{ minRows: 10, maxRows: 10 }"/>
        </t-form-item>
        <t-form-item>
          <t-space size="small">
            <t-button theme="primary" type="submit">生成随机字符串</t-button>
          </t-space>
        </t-form-item>
      </t-form>
    </t-row>
  </t-card>
</template>

<script lang="ts" setup>
import {ref, reactive} from 'vue';


const FORM_RULES = {
  vars: [{required: true, message: '基础参数'}],
  len: [{required: true, message: '位数'}]
};
const formData = reactive({
  customParameter: '',
  vars: [],
  result: '',
  len: 2,
});

const form = ref(null);

const generatorStr = (len: number): string => {
  let baseStr = '';
  for (let i = 0; i < formData.vars.length; i++) {
    let val = formData.vars[i];
    switch (val) {
      case '1':
        baseStr += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        break;
      case '2':
        baseStr += 'abcdefghijklmnopqrstuvwxyz';
        break;
      case '3':
        baseStr += '0123456789';
        break;
    }
  }
  if (formData.customParameter) {
    baseStr += formData.customParameter;
  }
  let result = '';
  let charactersLength = baseStr.length;
  for (let i = 0; i < len; i++) {
    result += baseStr.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};


const onSubmit = () => {
  formData.result = generatorStr(formData.len)
};

</script>