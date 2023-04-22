import { createApp, inject} from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './assets/main.css'

const app = createApp(App)

app.provide('token', '')

app.use(router).use(ElementPlus)

app.mount('#app')
