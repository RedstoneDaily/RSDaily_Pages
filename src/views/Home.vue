<script setup>
import Line from "../compoments/textUnderline.vue"
</script>

<template>
    <div class="main">
        <div>
            <img width="40%" src="/Logo.svg" alt="">
            <h1>/ 发现,并创造自己的灵感 /</h1>
        </div>
        <div class="jumpLink">
            <router-link to="/404">
                <Line>探索最新日报 >></Line>
            </router-link>
            <router-link to="/404">
                <Line>查看往期日报 >></Line>
            </router-link>
            <router-link to="/404">
                <Line>搜索红石机器 >></Line>
            </router-link>
            <router-link to="/404">
                <Line>查看日报小工具 >></Line>
            </router-link>

        </div>
    </div>
</template>

<style scoped>
.main {
    width: 100vw;
    height: 100vh;
    background: url('/background/Fparrot_CPU_small.png');
    background-size: 100% 100%;
}

.main img {
    pointer-events: none;
    user-select: none;
}

.main h1 {
    color: white;
    font-size: 3vw;
    font-weight: normal;
}

.main .jumpLink {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 50vw;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.main .button-line {
    font-size: 2vw;
    color: white;
}
</style>