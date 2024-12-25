<script setup>
const props = defineProps({
    data: {
        type: Object,
        required: true
    }
});

const formattedDate = props.data;

const openBilibiliUrl = (url) => {
    window.open(url, '_blank');
};
</script>

<template>
    <div @click="openBilibiliUrl(`https://www.bilibili.com/video/${formattedDate.bvid}`)" class="news-module">
        <img :src="'https:' + formattedDate.cover" referrerpolicy="no-referrer" alt="">
        <!-- 今日头条红头 -->
        <div class="news-header">
            <!-- 红色底色块 -->
            <div class="red-block"></div>
            <!-- 文字 -->
            <div class="news-title">

                <h1>今日头条</h1>
                <span>Headlines Today</span>
            </div>
        </div>
        <!-- 排名1 -->
        <div class="rank-first">
            <div class="text">
                <h1>1</h1>
                <span>st</span>
            </div>
        </div>
        <!-- 内容 -->
        <div class="content">
            <div class="content_block1">
                <div class="content_block3"></div>
            </div>
            <div class="content_block2"></div>
            <div class="title">{{ formattedDate.title }}</div>
            <div class="synopsis">
                {{ formattedDate.description }}
            </div>
            <div class="author">
                <img src="/src/assets/icon/bilibili.svg" alt="">
                <span>{{ formattedDate.data.owner.author }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
h1 {
    display: inline;
}

img {
    width: 100%;
    height: 100%;
}

.news-module {
    /* 模块的整体样式 */
    flex: 1;
    position: relative;
    /* background-image: url(/public/fm.png); */
    background-size: cover;
    background-position: center;
}

/* ========今日头条红头的样式======== */
.news-header {
    width: 330px;
    height: 50px;
    background-color: var(--RD-color-red-50);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 20px 100%);

    position: absolute;
    top: -4px;
    right: -2px;
}

.news-header .red-block {
    /* 红色底色块 */
    width: calc(100% - 20px);
    height: 100%;
    background-color: var(--RD-color-red);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 20px 100%);

    position: absolute;
    right: 0;
}

.news-header .news-title {
    /* 文字 */
    padding: 0 10px;
    color: var(--RD-color-white);
    position: absolute;
    right: 0;
    bottom: 4px;
}

.news-title h1 {
    margin: 0 8px;
    font-weight: normal;
}

/* ========排名1样式======== */
.rank-first {
    width: 80px;
    height: 80px;
    color: var(--RD-color-white);
    background-color: var(--RD-color-red-50);
    clip-path: polygon(0 0, 100% 100%, 0 100%);

    position: absolute;
    left: -4px;
    bottom: -4px;
}

.rank-first .text {
    position: absolute;
    bottom: 2px;
    left: 2px;
}

.rank-first h1 {
    font-size: 60px;
}

/* ========具体内容样式======== */
.content {
    min-width: 360px;
    width: calc(100% - 120px);
    height: 130px;
    clip-path: polygon(40px 0, 100% 0, 100% 100%, 0 100%);
    background-color: var(--RD-color-white-50);

    position: absolute;
    right: 0;
    bottom: 0;
}

/* 第一层白色块 */
.content_block1 {
    width: calc(100% - 20px);
    height: 130px;
    clip-path: polygon(40px 0, 100% 0, 100% 100%, 0 100%);
    background-color: var(--RD-color-white-50);

    position: absolute;
    right: 0;
    bottom: 0;
}

/* 第二层透明红色块 */
.content_block2 {
    width: 100%;
    height: 40px;
    background-color: var(--RD-color-red-50);

    position: absolute;
    right: 0;
    top: 0;
}

/* 第三层红色块 */
.content_block3 {
    width: 100%;
    height: 40px;
    background-color: var(--RD-color-red);

    position: absolute;
    right: 0;
    top: 0;
}

.title {
    height: 40px;
    overflow: hidden;
    font-size: 28px;
    color: var(--RD-color-white);
    position: absolute;
    top: 0px;
    left: 60px;
}

.synopsis {
    overflow: hidden;
    text-overflow: ellipsis;
    line-clamp: 3;
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    font-size: 15px;
    color: var(--RD-color-black);
    position: absolute;
    top: 40px;
    left: 60px;
}

/* 底部作者标签 */
.content .author {
    width: 100%;
    height: 24px;
    position: absolute;
    bottom: 0;
    left: 40px;
}

.content .author img {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 0;
    left: 0;
}

.content .author span {
    position: absolute;
    left: 24px;
    top: 0;
}
</style>