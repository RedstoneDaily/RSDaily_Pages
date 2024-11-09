<script setup>
import Line from '../component/textUnderline.vue';
</script>

<template>
    <div class="home">

        <div class="main">
            <div class="heroText">
                <img src="/Logo.svg" alt="">
                <h1>/ 发现,并创造自己的灵感 /</h1>
            </div>
            <div class="jumpLink">
                <router-link to="/content">
                    <!-- <router-link :to="{ path: '/content' , query: { date: '2024-09-06' }}"> -->
                    <Line>探索最新日报 >></Line>
                </router-link>
                <router-link to="/404">
                    <Line>查看往期日报 >></Line>
                </router-link>
                <router-link to="/search">
                    <Line>搜索红石机器 >></Line>
                </router-link>
                <router-link to="/404">
                    <Line>查看日报小工具 >></Line>
                </router-link>

            </div>
        </div>

        <div class="page1">
            <div class="mask">
                <div></div>
            </div>
            <img src="/ItemTexture/clock.png" alt="">
            <div class="title">
                <div><span>每天</span>都能收到</div>
                <div><span>优质</span>红石信息</div>
            </div>
            <div class="content">以质量而非流量优先的方式重塑信息源,
                打破视频社交媒体网站的推荐算法制造的信息茧房、以及对小众圈子的消声。归还Minecraft技术社区被淹没在日益浮躁、肤浅的娱乐之下的话语权。
            </div>
            <div class="link">
                <router-link to="/source">
                    <Line>探索今日日报 >></Line>
                </router-link>
                <router-link to="/404">
                    <Line>查看往期日报 >></Line>
                </router-link>
            </div>
        </div>
        <div class="page2">
            <div class="mask">
                <div></div>
            </div>
            <img src="/ItemTexture/knowledge_book.png" alt="">
            <div class="title">
                <div><span>整合</span>全网信息</div>
                <div><span>搜索</span>更加全面</div>
            </div>
            <div class="content">使用红石日报的搜索功能, 可以搜索全网/各大档案馆的所有机器信息, 使搜索更全面. 不仅如此, 我们还积极收录更多的信息源, 如果发现我们没有覆盖到的, 欢迎联系我们收录
            </div>
            <div class="link">
                <router-link to="/404">
                    <Line>查看所有可用的信息源 >></Line>
                </router-link>
                <router-link to="/404">
                    <Line>尝试搜索 >></Line>
                </router-link>
                <router-link to="/404">
                    <Line>报告更多 >></Line>
                </router-link>
            </div>
        </div>
        <div class="page3">
            <div class="mask">
                <div></div>
            </div>
            <img src="/ItemTexture/recovery_compass_07.png" alt="">
            <div class="title">
                <div>日报<span>小工具</span></div>
                <div><span>助力</span>MC开发</div>
            </div>
            <div class="content">我们提供一些对于MC开发实用的小工具, 使红石研究更加方便和顺畅, 而且不仅限于红石! 我们致力于使MC开发更简单和方便, 以及使小工具更加易用和实用
            </div>
            <div class="link">
                <router-link to="/404">
                    <Line>查看所有小工具 >></Line>
                </router-link>
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
img {
    image-rendering: pixelated;
}

// .home {
//     width: 100vw;
//     height: 100vh;
//     overflow-y: scroll;
//     scroll-snap-type: y mandatory;
//     scroll-behavior: smooth; // 添加平滑滚动
// }
// ::-webkit-scrollbar {
//     width: 0;
// }

@keyframes appear {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@mixin page {
    scroll-snap-align: start;
    // 页面宽高100，背景为figma设计图中的，设置定位
    width: 100%;
    height: 100vh;
    background-color: #8080FF;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.5);
    position: relative;
    // 溢出隐藏
    overflow: hidden;
    // 动画0.5s
    transition: all 0.5s;

    .title {
        // 定位+超大字体
        position: absolute;
        font-size: 90px;
        animation: appear linear;
        animation-timeline: view();
        animation-range: entry 0;

        div {
            position: relative;
        }

        span {
            // 给span设置红色
            color: var(--text-main-color);
        }
    }

    .content {

        position: absolute;
        width: 700px;
        font-size: 26px;
    }

    img {
        position: absolute;
        width: 768px;
        opacity: 0.4;
    }

    .mask {
        position: absolute;
        background-color: #D9D9D980;
        height: 100%;
        width: 60vw;

        div {
            position: absolute;
            height: 100%;
            width: calc(60vw - 40px);
            background-color: #D9D9D9;
        }
    }

    .link {
        position: absolute;
        display: flex;
        flex-direction: column;

        a {
            color: black;
        }
    }
}

.main {
    width: 100%;
    height: 100vh;
    background: url('/background/Fparrot_CPU_small.png');
    background-size: 100% 100%;
    scroll-snap-align: start;

    img {
        pointer-events: none;
        user-select: none;
    }

    h1 {
        color: white;
        font-size: 3vw;
        font-weight: normal;
    }

    .heroText {
        // display: inline-block;
        font-size: 100px;
        position: absolute;
        left: calc(100vh * 76 / 1080);
        top: calc(100vh * 57 / 1080);
        width: calc(100vh * 1139 / 1080);
        height: calc(100vh * 478 / 1080);

        img {
            position: absolute;
            left: calc(100% * 0 / 1139);
            top: calc(100% * 0 / 478);
            height: calc(100% * 373 / 478);
        }

        h1 {
            position: absolute;
            left: calc(100% * 30 / 1139);
            top: calc(100% * 394 / 478);
            width: 100%;
            font-size: calc(100vh * 65 / 1080);
        }
    }

    .jumpLink {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 50vw;
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        // 设置子元素字色
        a {
            color: white;
        }

    }
}

.page1 {
    @include page();

    background-image: url('/background/content.png');
    background-position-x: calc(100vw * 0.3);
    background-repeat: no-repeat;
    background-size: auto;

    .title {
        top: 80px;
        left: 60px;

        :last-child {
            left: 220px;
        }
    }

    .content {
        top: 316px;
        left: 60px;
        line-height: 35px;
    }

    img {
        bottom: calc((-768px / 2) + 240px);
        left: calc((-768px / 2) + 240px);
        transform: rotate(30deg);
    }

    .mask {
        // 使用路径切除右边斜切30度
        clip-path: polygon(0 0, 100% 0, 80% 100%, 0 100%);

        // 子元素div继承父元素的切除规则
        div {
            clip-path: inherit;
        }
    }

    .link {
        bottom: 100px;
        left: 60px;
    }
}

.page2 {
    @include page();
    background-image: url('/background/source.png');
    background-position-x: calc(100vw * -0.2);
    background-repeat: no-repeat;
    background-size: auto;

    .title {
        top: 80px;
        right: 280px;

        :last-child {
            right: -220px;
        }
    }

    .content {
        top: 316px;
        right: 60px;
        line-height: 35px;
    }

    img {
        bottom: calc((-768px / 2) + 240px);
        right: calc((-768px / 2) + 240px);
        transform: rotate(-10deg);
    }

    .mask {
        right: 0;
        // 使用路径切除右边斜切30度
        clip-path: polygon(20% 0, 100% 0, 100% 100%, 0 100%);

        // 子元素div继承父元素的切除规则
        div {
            right: 0;
            clip-path: inherit;
        }
    }

    .link {
        bottom: 100px;
        right: 60px;
    }
}

.page3 {
    @include page();

    .title {
        top: 80px;
        left: 60px;

        :last-child {
            left: 220px;
        }
    }

    .content {
        top: 316px;
        left: 60px;
        line-height: 35px;
    }

    img {
        bottom: calc((-768px / 2) + 240px);
        left: calc((-768px / 2) + 240px);
        transform: rotate(-30deg);
    }

    .mask {
        // 使用路径切除右边斜切30度
        clip-path: polygon(0 0, 100% 0, 80% 100%, 0 100%);

        // 子元素div继承父元素的切除规则
        div {
            clip-path: inherit;
        }
    }

    .link {
        bottom: 100px;
        left: 60px;
    }
}
</style>
