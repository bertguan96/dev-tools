<template>
  <div>
    <t-row class="row-line" :gutter="16">
      <h2>代码差异性对比</h2>
      <div id="editor"></div>
    </t-row>
    <t-row class='row-line' :gutter='16'>
      <t-card style="width: 100%">
        <div class="row-line title-info">操作说明：</div>
        <div>把代码复制到两边，会自动显示差异部分，目前支持 <strong>JSON，Python，Java，JavaScript，Vue</strong> 等模块的对比。</div>
      </t-card>
    </t-row>
  </div>
</template>

<script lang="ts" setup>
import {basicSetup} from "codemirror";
import {javascript} from "@codemirror/lang-javascript";
import {MergeView} from "@codemirror/merge";
import {onMounted, ref} from "vue";
import {json} from "@codemirror/lang-json";
import {python} from "@codemirror/lang-python";
import {java} from "@codemirror/lang-java";
import {vue} from "@codemirror/lang-vue";

const mergeView = ref({});


onMounted(() => {
  const editor = document.querySelector("#editor")
  if (editor) {
    const extensions = [
      basicSetup,
      javascript(),
      json(),
      python(),
      java(),
      vue(),
    ]
    mergeView.value = new MergeView({
      a: {doc: '', extensions: extensions},
      b: {doc: '', extensions: extensions},
      parent: editor,
      revertControls: "a-to-b",
    })
  }
});


</script>

<style scoped>
.row-line {
  margin-top: 10px;
  margin-bottom: 5px;
}

#editor {
  width: 100%;
}

/deep/ .cm-mergeView {
  height: 400px;
  overflow: auto;
  border: 1px solid silver;
  margin: -1px;
}


</style>