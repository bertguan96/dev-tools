<template>
  <div ref="editorRef" class="editor-main"></div>
</template>

<script setup lang="ts">

import {basicSetup, EditorView} from "codemirror";
import {EditorState, EditorStateConfig} from "@codemirror/state";
import {javascript} from "@codemirror/lang-javascript";
import {json} from '@codemirror/lang-json'
import {onMounted, ref} from "vue";

const editorRef = ref();
const editorView = ref();

const editorStateConfig = ref({})

const initEditor = () => {
  if (typeof editorView.value !== "undefined") {
    editorView.value.destroy();
  }
  editorStateConfig.value = {
    doc: '',
    extensions: [basicSetup, javascript(), json()],
  } as EditorStateConfig
  const startState = EditorState.create(editorStateConfig.value);
  if (editorRef.value) {
    editorView.value = new EditorView({
      state: startState,
      parent: editorRef.value,

    });
  }
};

const setText = (insertText: string) => {
  let text = editorView.value.state.doc.toString();
  editorView.value.dispatch({
    changes: {from: 0, to: text.length, insert: insertText},
  });
}

const clearContext = () => {
  editorView.value.dispatch({
    changes: {from: 0, to: 0, insert: null},
  });
}

const getText = (): string => {
  return editorView.value.state.doc.toString();
};

onMounted(() => {
  initEditor();
});

defineExpose({
  setText,
  clearContext,
  getText,
  editorStateConfig
})

</script>

<style scoped>
.editor-main {
  width: 100%;
  height: 100%;
}

/deep/ .cm-editor {
  width: 100%;
}
</style>