<template>
    <t-row class="row-line" :gutter="16">
        <t-col :span="6">
            <t-button theme="primary" variant="outline" @click="transform">转换</t-button>
        </t-col>
        <t-col :span="6">
            <t-button theme="primary" variant="outline" @click="writeToClipboard">复制</t-button>
        </t-col>
    </t-row>
    <t-row class="row-line" :gutter="16">
        <t-col :span="6">
            <Textarea v-model="code" placeholder="请输入需要转换的json字符串..."/>
        </t-col>
        <t-col :span="6">
            <Textarea v-model="transCode" />
        </t-col>
    </t-row>
</template>

<script setup lang="ts">
import { Textarea } from 'tdesign-vue-next';
import { ref } from 'vue';
import { Transform } from './transform';
import {ClipboardTools} from "@/tools/clipboard";

const code = ref('');
const transCode = ref('');

const transform = () => {
    transCode.value = Transform.GoToJson(code.value);
}

const writeToClipboard = () => {
  ClipboardTools.writeToClipboard(transCode.value)
}

</script>

<style scoped>
.row-line {
    margin-top: 10px;
}

/deep/ .t-textarea__inner {
    height: 300px;
}
</style>