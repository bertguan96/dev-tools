<template>
  <div class="home-page">
    <div class="home-title">
      <img src="@/assets/home_icon.png" alt=""/>
      <h1> 这是一个简单的开发者工具网站</h1>
      <h2> This is a simple developer tools website</h2>
      <div class="home-terminal">
        <div id="dynamic-text">
          <div id="terminal"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted} from "vue";

onMounted(() => {
  const terminal = document.getElementById('terminal');
  const text = '本网站为纯前端的工具页面，网页上所实现的所有工具均为前端编写不涉及任何后台服务，请勿进行任何非法的安全测试。'; // 要显示的文本
  let index = 0;
  if (terminal) {
    terminal.innerText = '';
    const timeInterVal = setInterval(() => {
      terminal.innerHTML += text.charAt(index); // 显示字符
      index++;

      if (terminal.scrollWidth > terminal.clientWidth) { // 当元素宽度无法容纳时，滚动到最左侧
        terminal.scrollLeft = terminal.scrollWidth - terminal.clientWidth;
      }

      if (index >= text.length) {
        clearInterval(timeInterVal); // 打字结束后停止执行
      }
  }, 100); // 设置打字速度
  }

})
</script>

<style scoped>
.home-title {
  width: 80%;
  text-align: center;
  margin: 0 auto;
}

img {
  width: 150px;
}
h1 {
  line-height: 40px;
}
#terminal {
  color: #0F0; /* 设置字符颜色为绿色 */
  font-size: 15px;
  font-family: monospace;
  width: 90%;
  margin: 0 auto;
  padding-top: 20px;
}
#dynamic-text {
  height: 300px;
  width: 100%;
  background-color: #000; /* 设置背景颜色为黑色 */
  white-space: pre-wrap;
  overflow: hidden;
  margin: 0 auto;
}
</style>