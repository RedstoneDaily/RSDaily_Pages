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
    <div @click="openBilibiliUrl(`https://www.bilibili.com/video/${formattedDate.bvid}`)" class="ContentItem">
        <!-- 封面图 -->
        <img width="220px" height="100%" :src="formattedDate.cover" referrerpolicy="no-referrer" alt="">
        <!-- 内容 -->
        <div class="content">
            <div class="content_block1">
                <!-- <div class="content_block3"></div> -->
            </div>
            <!-- <div class="content_block2"></div> -->
            <div class="title">{{ formattedDate.title }}</div>
            <!-- 械电图标 -->
            <div class="icon">
                <img src="/src/assets/icon/xiedian_black.svg" alt="">
            </div>
            <!-- 红线 -->
            <div class="line">
                <div class="redline"></div>
                <div class="redline_point"></div>
            </div>
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
.ContentItem {
    box-shadow: 0 2px 6px 1px #00000020;
    flex: 1 0 500px;
    height: 120px;
    /* background-color: aqua; */
    position: relative;

    --text-height: 30px;
}

/* ========具体内容样式======== */
.content {
    min-width: 360px;
    width: calc(100% - 160px);
    height: 100%;
    clip-path: polygon(40px 0, 100% 0, 100% 100%, 0 100%);
    background-color: var(--RD-color-white-50);
    /* 鼠标移动到上面的时候改变成点击的光标 */
    cursor: pointer;

    position: absolute;
    right: 0;
    bottom: 0;
}

.content .icon {
    position: absolute;
    right: 0;
    width: 40px;
    height: var(--text-height);
    background-color: var(--RD-color-white);
}

.content img {
    position: absolute;
    right: 6px;
    top: calc((var(--text-height)/2) - 12px);
}

.line {
    position: absolute;
    right: 0;
    top: calc(var(--text-height) + 5px);
    height: 2px;
    width: calc(100% - 20px);
}

.redline {
    width: calc(100% - 40px);
    position: absolute;
    right: 40px;
    height: 100%;
    background: var(--RD-color-red);
}

.redline_point {
    height: 100%;
    width: 40px;
    background: linear-gradient(to right, var(--RD-color-red), var(--RD-color-red), transparent 5px, transparent);
    background-size: 10px 100%;
    position: absolute;
    right: 0;
}

/* 第一层白色块 */
.content_block1 {
    width: calc(100% - 20px);
    height: 100%;
    clip-path: polygon(40px 0, 100% 0, 100% 100%, 0 100%);
    background-color: var(--RD-color-bg);

    position: absolute;
    right: 0;
    bottom: 0;
}

/* 第二层透明红色块 */
.content_block2 {
    width: 100%;
    height: var(--text-height);
    background-color: var(--RD-color-red-50);

    position: absolute;
    right: 0;
    top: 0;
}

/* 第三层红色块 */
.content_block3 {
    width: 100%;
    height: var(--text-height);
    background-color: var(--RD-color-red);

    position: absolute;
    right: 0;
    top: 0;
}

.title {
    /* 只显示一行，超出省略号 */
    overflow: hidden;
    height: var(--text-height);
    width: calc(100% - 120px);
    line-height: var(--text-height);
    font-size: 26px;
    color: var(--RD-color-text);
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
    color: var(--RD-color-text);
    position: absolute;
    top: calc(var(--text-height) + 10px);
    left: 50px;
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