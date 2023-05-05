<template>
  <div>
    <t-row class='row-line' :gutter='16'>
      剪切板读取：<t-button theme='primary' variant='outline' @click='cleanClipboard'>清空剪切板</t-button>
    </t-row>
    <t-row class='row-line' :gutter='16'>
      <div id="clipboardEditor" class="editor hljs" contenteditable="false"></div>
    </t-row>
  </div>
</template>

<script lang="ts" setup>
import {onMounted} from "vue";
import {html_beautify} from 'js-beautify'
import 'highlight.js/styles/monokai-sublime.css'
import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';

const cleanClipboard = () => {
  const htmlCode = document.querySelector('#clipboardEditor');
  if (htmlCode) {
    htmlCode.innerHTML = '';
  }
}

onMounted(() => {
  hljs.registerLanguage('javascript', javascript);
  hljs.registerLanguage('css', css);
  hljs.registerLanguage('xml', xml);

  // 创建一个隐藏的div元素
  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.left = '-9999px';

// 将div添加到文档中
  document.body.appendChild(div);

// 监听文档的paste事件
  document.addEventListener('paste', function (e) {
    // 获取剪贴板数据
    const clipboardData = e.clipboardData;
    const htmlData = clipboardData!.getData('text/html');
    div.innerHTML = htmlData;
    const pastedHtml = div.innerHTML;
    const htmlCode = document.querySelector('#clipboardEditor')
    if (htmlCode) {
      let code = html_beautify(pastedHtml, {
        "indent_size": 2,
        "indent_char": " ",
      });
      code = hljs.highlight('xml', code, true).value;
      htmlCode.innerHTML = `<pre><code class="language-xml">${code}</code></pre>`;
    }
  });
});

</script>

<style scoped>
.row-line {
  margin-top: 10px;
  line-height: 30px;
}

.editor {
  height: 600px;
  display: flex;
  width: 100%;
  min-height: var(--td-comp-size-xxxl);
  border: 1px solid var(--td-border-level-2-color);
  border-radius: var(--td-radius-default);
  padding: calc(calc(var(--td-comp-size-m) - var(--td-line-height-body-medium)) / 2) var(--td-comp-paddingLR-s);
  /*background-color: var(--td-bg-color-specialcomponent);*/
  font: var(--td-font-body-medium);
  /*color: var(--td-text-color-primary);*/
  resize: vertical;
  outline: none;
  /*transition: all cubic-bezier(0.38, 0, 0.24, 1) 0.2s, height 0s;*/
  box-sizing: border-box;
  overflow-y: auto;
}
</style>