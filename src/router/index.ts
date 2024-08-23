import { createMemoryHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";

const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
    ]
})

export default router;