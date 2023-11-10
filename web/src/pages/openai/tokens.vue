<template>
  <div>
    <t-row class='row-line' :gutter='16'>
      <t-card style="width: 100%">
         本程序采取和OpenAI相同的算法进行编写，可以放心使用。
      </t-card>
    </t-row>
    <t-row class='row-line' :gutter='16'>
      <Textarea v-model='inputStr' @change="onChange"/>
    </t-row>
    <t-divider />
    <t-row class='row-line' :gutter='16'>
      <div class="token-styles">Tokens: <span style="font-size: 20px">{{tokens}}</span></div>
    </t-row>
  </div>
</template>

<script lang="ts" setup>
import {Textarea, TextareaValue} from 'tdesign-vue-next';
import {ref} from "vue";
import {encode} from 'gpt-3-encoder'

const inputStr = ref('')
const tokens = ref(0)
const tokenIds = ref([])

const onChange = (e: TextareaValue, context?: { e?: InputEvent | undefined; } | undefined) => {
  const inputText = e as string;
  if (e === '') {
    tokens.value = 0
    tokenIds.value = []
    return
  }
  const encoded = encode(inputText);
  tokenIds.value  = encoded as never[];
  tokens.value = encoded.length;
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