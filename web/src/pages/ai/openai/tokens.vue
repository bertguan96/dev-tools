<template>
  <div>
    <t-row class='row-line' :gutter='16'>
      <t-card style="width: 100%">
        本程序采取和OpenAI相同的算法进行编写。
      </t-card>
    </t-row>
    <t-row class='row-line' :gutter='16'>
      <t-col :span="2" style="padding-left: 0px">
        <t-select placeholder="请选择模型" v-model="model" @change="onSelectChange">
          <t-option key="GPT-4-Turbo" label="GPT-4 Turbo" value="GPT-4-Turbo"/>
          <t-option key="GPT-4" label="GPT-4" value="GPT-4" />
          <t-option key="GPT-4-32K" label="GPT-4-32K" value="GPT-4-32K" />
          <t-option key="GPT-3.5-turbo-1106" label="GPT-3.5-turbo-1106" value="GPT-3.5-turbo-1106"/>
          <t-option key="GPT-3.5-turbo-instruct" label="GPT-3.5-turbo-instruct" value="GPT-3.5-turbo-instruct"/>
        </t-select>
      </t-col>
      <t-col :span="5" style="padding-left: 0px">
        <t-input v-model='outputTokenLen' placeholder="预计输出token长度"  @change="tokenChange"/>
      </t-col>
    </t-row>
    <t-row class='row-line' :gutter='16'>
      <Textarea v-model='inputStr' @change="onChange"/>
    </t-row>
    <t-divider/>
    <t-row class='row-line' :gutter='16'>
      <div class="token-styles">Tokens: <span style="font-size: 20px">{{ tokens }}</span></div>
      <div class="token-styles" style="margin-left: 10px">Prices（刀）: <span style="font-size: 20px">{{ price }}</span></div>
    </t-row>
  </div>
</template>

<script lang="ts" setup>
import {Textarea, TextareaValue, SelectValue} from 'tdesign-vue-next';
import {ref} from "vue";
import {encode} from 'gpt-3-encoder'
import {OpenAIPrice} from "@/pages/ai/openai/openai";

const inputStr = ref('');
const tokens = ref(0);
const tokenIds = ref([]);
const model = ref('');  // 模型版本
const outputTokenLen = ref(0); // 输出token长度
const price = ref(0); // 价格

const priceMap: OpenAIPrice = {
  "GPT-4-Turbo": {
    "input": 0.01,
    "output": 0.03
  },
  "GPT-4": {
    "input": 0.03,
    "output": 0.06
  },
  "GPT-4-32k": {
    "input": 0.03,
    "output": 0.06
  },
  "GPT-3.5-turbo-1106": {
    "input": 0.001,
    "output": 0.002
  },
  "GPT-3.5-turbo-instruct": {
    "input": 0.001,
    "output": 0.002
  }
}

const onSelectChange = () => {
  const currentModel = model.value;
  if (currentModel !== "") {
    price.value = priceMap[currentModel]["input"] * tokens.value/1000 + priceMap[currentModel]["output"] * outputTokenLen.value/1000
  }
};

const tokenChange = () => {
  const currentModel = model.value;
  if (currentModel !== "") {
    price.value = priceMap[currentModel]["input"] * tokens.value/1000 + priceMap[currentModel]["output"] * outputTokenLen.value/1000
  }
}

const onChange = (e: TextareaValue, context?: { e?: InputEvent | undefined; } | undefined) => {
  const inputText = e as string;
  if (e === '') {
    tokens.value = 0
    tokenIds.value = []
    return
  }
  const encoded = encode(inputText);
  tokenIds.value = encoded as never[];
  tokens.value = encoded.length;
  const currentModel = model.value;
  if (currentModel !== "") {
    price.value = priceMap[currentModel]["input"] * tokens.value/1000 + priceMap[currentModel]["output"] * outputTokenLen.value/1000
  }
}
</script>

<style scoped>
/deep/ .t-textarea__inner {
  height: 300px;
}

.row-line {
  margin-top: 10px;
}

.token-styles {
  color: #202123;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
}
</style>