import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import {VueMasonryPlugin} from 'vue-masonry';

createApp(App)
    .use(router)
    .use(VueMasonryPlugin)
    .mount('#app')