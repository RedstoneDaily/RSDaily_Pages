import { createMemoryHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Page_404 from "@/views/404.vue"
import ContentPage from "@/views/ContentPage.vue";

const router = createRouter({
    history: createMemoryHistory(),
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
        }
    ]
})

export default router;