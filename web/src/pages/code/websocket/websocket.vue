<template>
  <div>
    <t-row class="row-line" :gutter="16">
      <t-col :span='6'>
        <t-input theme='primary' :disabled="disabled" v-model='wsUrl' placeholder='请输入Websocket链接'
                 aria-required='true'></t-input>
      </t-col>
      <t-col :span='3'>
        <t-button theme='primary' variant='outline' @click='connect'>连接</t-button>
      </t-col>
    </t-row>
    <t-row class="row-line" :gutter="16">
      <t-col :span='6'>
        <t-input theme='primary' :disabled="!isWsConnected" v-model='message' placeholder='请输入消息'
                 aria-required='true'></t-input>
      </t-col>
      <t-col :span='3'>
        <t-button theme='primary' variant='outline' @click='send'>发送</t-button>
      </t-col>
    </t-row>
    <t-row class='row-line' :gutter='16'>
      <t-col :span='6'>
        状态： <span v-if="isWsConnected" style="color:lawngreen;">已连接</span>
        <span v-else>未连接</span>
      </t-col>
    </t-row>
    <t-row class='row-line' :gutter='16'>
      <t-col :span='6'>
        <div id="receiveMsg"></div>
      </t-col>
    </t-row>
  </div>
</template>

<script lang="ts" setup>

import {onMounted, ref} from "vue";
import {Websocket_factory} from "@/pages/code/websocket/websocket_factory";
import {MessagePlugin} from "tdesign-vue-next";

const wsUrl = ref('')
const message = ref('')

const disabled = ref(false)
const isWsConnected = ref(false)
const factory = Websocket_factory.getInstance();

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
    if (wsUrl.value == "") {
      MessagePlugin.warning("请先输入websocket！")
      return
    }
    factory.newConnect(wsUrl.value)
    factory.checkConnect(() => {
      disabled.value = true
    })
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

#receiveMsg {
  border: 1px solid;
  height: 500px;
  overflow-y: auto;
  padding: 10px;
  box-shadow: 1px 1px 1px #333333;
}
</style>