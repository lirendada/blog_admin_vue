import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { Lock, User } from '@element-plus/icons-vue'

import router from '@/router'
import '@/styles/index.scss'

const app = createApp(App)
app.use(ElementPlus)
app.use(createPinia())
app.use(router)
app.component(Lock.name, Lock)
app.component(User.name, User)

app.mount('#app')