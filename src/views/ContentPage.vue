<script setup>
import { useRoute } from 'vue-router';
import ContentTop from './ContentPage/ContentTop.vue';
import ContentList from './ContentPage/ContentList.vue';
import { ref } from 'vue';

// 获取查询参数
const { query } = useRoute();
const date = ref('');

fetch("https://api.rsdaily.com/v2/daily", { method: 'GET' }).then(res => res.json()).then(data => {
    console.log(data[0].date);
    // 如果查询参数中有date字段，则直接使用它，否则使用当前日期
    date.value = query.date || data[0].date;
})

console.log(`日期:` + date);

</script>

<template>
    <div class="content-page" v-if="date != ''">
        <ContentTop :date="date"></ContentTop>
        <ContentList :date="date"></ContentList>
    </div>
</template>

<style scoped>
.content-page {
    width: 100%;
    min-height: 100vh;
    background-color: var(--RD-color-bg);
}
</style>
