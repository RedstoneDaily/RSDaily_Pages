<template>
    <title>{{ title }}</title>
    <navbar v-show="showBar"></navbar>
    <router-view :key="$route.fullPath"></router-view>
    <!-- 备案信息 -->
    <div class="footer">
        © 2024 Redstone Daily | 
        <a href="https://beian.miit.gov.cn/" target="_blank">闽ICP备2024058720号-2</a>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import navbar from '@/component/Navbar.vue';
import title from './store/title';
const showBar = ref(true);
</script>

<style scoped>
.footer{
    text-align: center;
    color: white;
    padding: 10px 10px;
    background-color: var(--red-color);
}

.footer a{
    color: white;
    text-decoration: none;
}
</style>