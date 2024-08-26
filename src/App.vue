<template>
    <title>{{ title }}</title>
    <navbar v-show="showBar"></navbar>
    <router-view></router-view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import navbar from '@/component/Navbar.vue';
import title from './store/title';
let showBar = ref(true);
</script>

<style scoped>
</style>