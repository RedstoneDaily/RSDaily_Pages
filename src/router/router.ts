import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/views/home/home.vue'

const routes = [
    { path: '/', redirect: '/home' },
    {
        path: '/home',
        component: Home
    }, {
        path: '/about',
        component: () => import('@/views/about/about.vue')
    }, {
        path: '/source',
        component: () => import('@/views/source/source.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router