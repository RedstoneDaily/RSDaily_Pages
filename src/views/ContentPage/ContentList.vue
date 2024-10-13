<script setup>
import { ref, onMounted } from 'vue';
import ContentItem1st from '@/component/content/ContentItem1st.vue';
import ContentItem2nd from '@/component/content/ContentItem2nd.vue';
import ContentItem3rd from '@/component/content/ContentItem3rd.vue';
import ContentItem from '@/component/content/ContentItem.vue';

const props = defineProps({
    date: {
        type: String,
        required: true,
    },
});

const contentList = ref([]);
const error = ref();
const isLoading = ref(true); // 加载状态

const fetchData = async () => {
    isLoading.value = true; // 开始加载
    try {
        const res = await fetch(`https://api.rsdaily.com/v2/daily/get/${props.date}`, { method: 'GET' });
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        contentList.value = data;
    } catch (err) {
        console.error('Fetch error:', err);
        error.value = err;
    } finally {
        isLoading.value = false; // 加载结束
    }
};

onMounted(() => {
    fetchData();
});



// 动画函数
const showItem = ref(false);

onMounted(() => {
    setTimeout(() => {
        showItem.value = true;
    }, 200);
});
const beforeEnter = (el) => {
    el.style.opacity = 0;
};
const enter = (el, done) => {
    let delay = el.dataset.index * 80;
    setTimeout(() => {
        el.style.opacity = 1;
        el.style.transition = "opacity .5s"
    }, delay);
};
</script>

<template>
    <div v-if="isLoading">
        加载中...( ￣□￣)/ 让数据飞一会儿
    </div>

    <div v-else-if="contentList.length" class="content-list">
        <!-- 正常数据展示 -->
        <div class="content-list-top">
            <div class="item_1st">
                <ContentItem1st :data="contentList[0]"></ContentItem1st>
            </div>
            <div class="item_right">
                <div class="item item_2nd">
                    <ContentItem2nd :data="contentList[1]"></ContentItem2nd>
                </div>
                <div class="item item_3rd">
                    <ContentItem3rd :data="contentList[2]"></ContentItem3rd>
                </div>
            </div>
        </div>
        <div class="content-list-other">
            <TransitionGroup @before-enter="beforeEnter" @enter="enter">
                <ContentItem v-show="showItem" v-for="(item, index) in contentList.slice(3)" :key="item.aid"
                    :data="item" :data-index="index"></ContentItem>
            </TransitionGroup>
        </div>
    </div>

    <div v-else-if="error">
        出错啦！现场只发现了这个讯息：{{ error.message }}。快叫管理员来看看！！
    </div>

    <div v-else>
        数据呢？！(っ °Д °;)っ不见啦！！
    </div>
</template>


<style scoped lang="scss">
@keyframes enter {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

/* 宽度最大为1280px */
.content-list {
    max-width: 1280px;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

/* 头部布局，flex，横向布局，间距20px */
.content-list-top {
    display: flex;
    gap: 20px;
    flex-direction: row;
    animation-duration: 0.5s;
    animation-name: enter;
}

/* 各种块item的初始值，宽度最小500px 高度最小120px  */
.item {
    min-width: 500px;
    min-height: 120px;
    box-shadow: 0 2px 6px 1px #00000020;
    /* 暂时显示一下 */
    /* background-color: var(--RD-color-white); */
}

/* 头条块的基本样式，默认宽度500px 高度280px，根据宽度比例分配 */
.item_1st {
    flex: 1 0 480px;
    height: 300px;
    display: flex;
    box-shadow: 0 2px 6px 1px #00000040;

    transition: all 0.5s ease-out;
}

/* 右边块的基本样式，默认宽度500px(跟头条块实现平均分配空间)，并设置flex布局，使子元素间隔20px */
.item_right {
    flex: 1 0 480px;
    display: flex;
    gap: 20px;
    flex-direction: column;
}

/* 子元素基本样式，默认高度120px */
.item_2nd {
    flex: 1 0 120px;
    display: flex;
}

.item_3rd {
    flex: 1 0 120px;
    display: flex;
}


.content-list-other {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}


/* 当页面宽度小于1024px时的样式 */
@media screen and (max-width: 1024px) {
    .content-list {
        padding: 0 14px;
        max-width: 560px;
    }

    .item_right {
        flex: 1 0 240px;
    }

    .item_1st {
        flex: 1 0 240px;
        height: 200px;
    }

    .content-list-top {
        flex-direction: column;
    }
}
</style>