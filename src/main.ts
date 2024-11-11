import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/index.css'
import 'reset-css'
// echarts
import VChart from "vue-echarts";

const app = createApp(App)
app.component('VChart', VChart)

app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount('#app')
