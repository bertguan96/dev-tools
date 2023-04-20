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
        <t-input theme='primary' :disabled="!isWsConnected" v-model='message' placeholder='请输入消息' aria-required='true'></t-input>
      </t-col>
      <t-col :span='3'>
        <t-button theme='primary' variant='outline' @click='send'>发送</t-button>
      </t-col>
    </t-row>
    <t-row class='row-line' :gutter='16'>
        <div v-if="isWsConnected">已连接</div>
        <div v-else>未连接</div>
    </t-row>
    <t-row class='row-line' :gutter='16'>
      <div id="receiveMsg"></div>
    </t-row>
  </div>
</template>

<script lang="ts" setup>

import {onMounted, ref} from "vue";
import {WebsocketFactory} from "@/pages/code-tools/websocket/websocket_factory";

const wsUrl = ref('ws://127.0.0.1:8080/websocket')
const message = ref('')

const disabled = ref(false)
const isWsConnected = ref(false)
const factory = WebsocketFactory.getInstance();

onMounted(() => {
  // 定时获取判断ws是否链接
  const setIntervalHandler = setInterval(() => {
      if (factory.isConnected()) {
        isWsConnected.value = true
        factory.addListener(readWsMessage)
        clearInterval(setIntervalHandler)
      }
  }, 100)
});

const readWsMessage = (msg: string) => {
    const renderDom = document.getElementById('receiveMsg');
    if (renderDom) {
      const textDom = document.createElement('div')
      textDom.textContent = `收到：${msg}`
      renderDom.appendChild(textDom)
    }
};
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
  factory.onMessage(message.value)
  const renderDom = document.getElementById('receiveMsg');
  if (renderDom) {
    const textDom = document.createElement('div')
    textDom.textContent = `发送：${message.value}`
    renderDom.appendChild(textDom)
  }
}
</script>

<style scoped>
.row-line {
  margin-top: 10px;
}
</style>