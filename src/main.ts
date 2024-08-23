import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// 引入Vue Router

const Vue = createApp(App)
Vue.use(router)
Vue.mount('#app')