import { createApp } from 'vue'
import TDesign from 'tdesign-vue-next';
import 'tdesign-vue-next/es/style/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'

import './style.css'
import App from './App.vue'
import { router } from './router'

const app = createApp(App)
app.use(router)    // 全局加载路由
app.use(TDesign);  // 先全局加载Tdesign，后续有需求再优化
app.use(VueAxios, axios);
app.mount('#app')


