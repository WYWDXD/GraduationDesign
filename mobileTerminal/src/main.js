import './assets/main.scss'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from '@/router'
import * as echarts from 'echarts'
import App from './App.vue'
import {createPinia} from 'pinia'
import { createPersistedState } from 'pinia-persistedstate-plugin'
import $ from 'jquery';
import locale from 'element-plus/dist/locale/zh-cn.js'
import 'default-passive-events'
window.$ = window.jQuery = $;
const app = createApp(App);
const pinia = createPinia();
const persist = createPersistedState();
pinia.use(persist)
app.use(pinia)
app.use(router)
app.use(ElementPlus,{locale});
app.config.globalProperties.$echarts = echarts;
app.mount('#app')
