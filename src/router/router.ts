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
    }, {
        path: '/tools',
        children: [
            {
                path: 'acacia',
                component: () => import('@/views/tools/AcaciaMCView.vue')
            },
            {
                path: 'rssearch',
                component: () => import('@/views/tools/RSSearchView.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router