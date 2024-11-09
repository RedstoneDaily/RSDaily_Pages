import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import {VueMasonryPlugin} from 'vue-masonry';

// 引入Vue Router

const Vue = createApp(App)
Vue.use(router)
Vue.use(VueMasonryPlugin)
Vue.mount('#app')