import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Page_404 from "@/views/404.vue"
import ContentPage from "@/views/ContentPage.vue";
import Search from "@/views/Search.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: '/404',
            name: '404',
            component: Page_404
        },
        {
            path: '/content',
            name: 'content',
            component: ContentPage
        },
        {
            path: '/search',
            name: 'search',
            component: Search
        }
    ]
})

export default router;