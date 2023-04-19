<template>
  <div>
    <t-row class="row-line" :gutter="16">
      <t-col :span='6'>
        <t-input theme='primary' :disabled="disabled" v-model='wsUrl' placeholder='请输入Websocket链接' aria-required='true'></t-input>
      </t-col>
      <t-col :span='3'>
        <t-button theme='primary' variant='outline' @click='connect'>连接</t-button>
      </t-col>
    </t-row>
    <t-row class="row-line" :gutter="16">
      <t-col :span='6'>
        <t-input theme='primary' :disabled="disabled" v-model='message' placeholder='请输入消息' aria-required='true'></t-input>
      </t-col>
      <t-col :span='3'>
        <t-button theme='primary' variant='outline' @click='connect'>发送</t-button>
      </t-col>
    </t-row>
    <t-row class='row-line' :gutter='16'>

    </t-row>
  </div>
</template>

<script lang="ts" setup>

import {onMounted, ref} from "vue";
import {WebsocketFactory} from "@/pages/code-tools/websocket/websocket_factory";

const wsUrl = ref('ws://127.0.0.1:8080/websocket')
const message = ref('')

const disabled = ref(false)
const factory = WebsocketFactory.getInstance();

onMounted(() => {
});
const connect = () => {
  try {
    factory.newConnect(wsUrl.value)
    factory.checkConnect()
    disabled.value = true
  } catch (e) {
    console.error(e)
  }
};

const send = () => {
  factory.onMessage((msg) => {})
}
</script>

<style scoped>
.row-line {
  margin-top: 10px;
}
</style>